import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig, dbConfig } from './config';
import { AccessLogMiddleware } from './tools';
import * as MockServices from './mock';

import {
  AbstractTestingModule,
  AuthModule,
  EducationalSpaceModule,
  InfrastructureModule,
  LaunchedTestingModule,
  TagModule,
  TestingAttemptModule,
  UserModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),

    AbstractTestingModule,
    AuthModule,
    EducationalSpaceModule,
    InfrastructureModule,
    LaunchedTestingModule,
    TagModule,
    TestingAttemptModule,
    UserModule,
  ],
  providers: [...Object.values(MockServices)],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
