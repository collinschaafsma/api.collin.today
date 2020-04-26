import { Injectable, HttpService } from '@nestjs/common';
import { Integration } from './integration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IntegrationCreateInput } from './dto/integration.create.inputs';
import { User } from '../users/user.entity';
import { AxiosRequestConfig } from 'axios';
import { Activity } from '../activities/activity.entity';
import { ActivityType } from '../activities/dto/activities.types';
import { StravaActivity } from '../activities/strava-activity.entity';
import { stringify } from 'qs';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,

    private readonly httpService: HttpService,

    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,

    @InjectRepository(StravaActivity)
    private stravaActivityRepository: Repository<StravaActivity>,
  ) {}

  async create(data: IntegrationCreateInput, user: User): Promise<Integration> {
    const integration = this.integrationsRepository.create(data);
    integration.userId = user.id;

    return await this.integrationsRepository.save(integration);
  }

  async update(id: string, data: IntegrationCreateInput): Promise<Integration> {
    const integrationToUpdate = await this.integrationsRepository.findOneOrFail(id);
    const integrationUpdated = Object.assign(integrationToUpdate, data);
    
    return await this.integrationsRepository.save(integrationUpdated);
  }

  async findOneByKey(key: string): Promise<Integration> {
    return await this.integrationsRepository.findOne({key});
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.integrationsRepository.delete(id);
  }

  //TODO: Move this into a que someday
  async stravaActivityFetch(stravaActivityId: string): Promise<string> {
    const integration = await this.initIntegrationByKey('strava');
    // TODO: Move this into a config variable
    const url = `https://www.strava.com/api/v3/activities/${stravaActivityId}`;

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${integration.accessToken}`,
      },
    };

    const response = await this.httpService.get(url, config).toPromise();

    let activity: Activity = this.activityRepository.create();
    const stravaActivity: StravaActivity = this.stravaActivityRepository.create();

    activity.title = response.data['name'];
    activity.description = response.data['description'];
    activity.publishAt = response.data['start_date'];
    activity.type = ActivityType.STRAVA;

    activity = await this.activityRepository.save(activity);

    stravaActivity.activity = activity;
    stravaActivity.averageCadence = response.data['average_cadence'];
    stravaActivity.averageHeartRate = response.data['average_heartrate'];
    stravaActivity.averageSpeed = response.data['average_speed'];
    stravaActivity.averageWatts = response.data['average_watts'];
    stravaActivity.calories = response.data['calories'];
    stravaActivity.deviceName = response.data['device_name'];
    stravaActivity.distance = response.data['distance'];
    stravaActivity.elapsedTime = response.data['elapsed_time'];
    stravaActivity.embedToken = response.data['embed_token'];
    stravaActivity.externalId = response.data['external_id'];
    stravaActivity.kilojoules = response.data['kilojoules'];
    stravaActivity.mapPolyline = response.data['map']['polyline'];
    stravaActivity.mapSummaryPolyline = response.data['map']['summary_polyline'];
    stravaActivity.maxHeartRate = response.data['max_heartrate'];
    stravaActivity.maxSpeed = response.data['max_speed'];
    stravaActivity.maxWatts = response.data['max_watts'];
    stravaActivity.movingTime = response.data['moving_time'];
    stravaActivity.startDate = response.data['start_date'];
    stravaActivity.stravaType = response.data['type'];
    stravaActivity.sufferScore = response.data['suffer_score'];
    stravaActivity.totalElevationGain = response.data['total_elevation_gain'];
    stravaActivity.weightedAverageWatts = response.data['weighted_average_watts'];

    await this.stravaActivityRepository.save(stravaActivity);

    return activity.title;
  }

  async ouraScoresFetch(): Promise<number> {
    const integration = await this.initIntegrationByKey('oura');
    // Grab last nights data
    const now = new Date();
    console.log(now);
    const nowHere = new Date(now.toLocaleString('en-US', { timeZone: 'America/Denver' }));
    nowHere.setDate(now.getDate() - 1);
    
    console.log(nowHere);
    const sleepStart = nowHere.toISOString().split('T')[0];
    console.log(sleepStart);
    // TODO: Move this into a config variable
    const sleepUrl = `https://api.ouraring.com/v1/sleep?start=2020-04-24&end=2020-04-24`;

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${integration.accessToken}`,
      },
    };

    const response = await this.httpService.get(sleepUrl, config).toPromise();

    return response.data['sleep'][0]['score'];
  }

  private async initIntegrationByKey(key: string): Promise<Integration> {
    const integration = await this.findOneByKey(key);
    const now = new Date(Date.now());

    if(integration.accessTokenExpiresAt < now) {
      console.log('Need a new token');
      // The access token has expired, exchange refresh token for a new one
      let payload: any = {
        'client_id': integration.clientId,
        'client_secret': integration.secret,
        'grant_type': 'refresh_token',
        'refresh_token': integration.refreshToken,
      }

      let contentType = 'application/json';

      if(key === 'oura') {
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        payload = stringify(payload);
      }

      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': contentType,
        },
      };

      const response = await this.httpService.post(
        integration.accessTokenUrl, 
        payload, 
        config
      ).toPromise();

      const expiresAt = new Date(Date.now());
      expiresAt.setSeconds(expiresAt.getSeconds() + response.data['expires_in']);

      integration.accessToken = response.data['access_token'];
      integration.accessTokenExpiresAt = expiresAt;
      integration.refreshToken = response.data['refresh_token'];
      this.integrationsRepository.save(integration);
    }

    return integration;
  }
}
