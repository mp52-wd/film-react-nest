import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import * as path from "node:path";

import {configProvider} from "./app.config.provider";
import {FilmsModule} from "./films/films.module";

@Module({
  imports: [
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get<string>('DATABASE_URL'),
        }),
        inject: [ConfigService],
      }),
      FilmsModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
