import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
import { ActivitiesModule } from './activities/activities.module'; 

@Module({
  imports: [
    ActivitiesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
