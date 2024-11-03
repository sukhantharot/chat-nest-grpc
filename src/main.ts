import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs';

const protoChatFiles = fs
  .readdirSync(join(__dirname, 'proto/chat'))
  .filter((file) => file.endsWith('.proto'))
  .map((file) => join(__dirname, 'proto/chat', file));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  app.use(
    session({
      secret: configService.get<string>('AUTH_SECRET', 'secret'),
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const appPort = configService.get<number>('PORT', 3000);
  await app.listen(appPort);
  const grpcPort = configService.get<number>('GRPC_PORT', 3000);

  // Configure the gRPC server
  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'chat', // Name of the package in .proto files
      protoPath: protoChatFiles,
      url: `0.0.0.0:${grpcPort}`, // Set the gRPC server to listen on this port
    },
  };
  app.connectMicroservice<MicroserviceOptions>(grpcOptions);

  const stage = process.env.ENV;
  Logger.log(
    'REST API is running in "' +
      stage +
      '" stage, and it is listening at: http://localhost:' +
      appPort +
      '/',
  );
  Logger.log(
    'GRPC is running in "' +
      stage +
      '" stage, and it is listening at: http://localhost:' +
      grpcPort +
      '/',
  );
}

bootstrap();
