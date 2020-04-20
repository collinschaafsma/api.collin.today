import { Controller, Post, Body, HttpCode, Get, Req } from '@nestjs/common';
import { StravaWebhookInput } from './dto/strava.webhook.input';
import { IntegrationsService } from './integrations.service';
import { Request } from 'express';

@Controller('integrations')
export class IntegrationsController {
  constructor(private integrationsService: IntegrationsService) {}

  @Post('fetch/strava/activity')
  @HttpCode(200)
  async fetchStravaActivity(@Body() stravaWebhookInput: StravaWebhookInput) {
    if(stravaWebhookInput.aspect_type === 'create' 
      && stravaWebhookInput.object_type === 'activity') {
        return await this.integrationsService.stravaActivityFetch(stravaWebhookInput.object_id.toString());
    }
  }

  @Get('subscription/strava/callback')
  async subscriptionStravaCallback(@Req() request: Request) {
    if(process.env.STRAVA_VERIFY_TOKEN === request.query['hub.verify_token']) {
      return { "hub.challenge": request.query['hub.challenge'] };
    }
  } 

}
