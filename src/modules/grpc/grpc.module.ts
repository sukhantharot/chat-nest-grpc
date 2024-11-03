import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs';

// Load all .proto files from the specified directory
const protoUserFiles = fs
  .readdirSync(join(__dirname, '../../proto/user'))
  .filter((file) => file.endsWith('.proto'))
  .map((file) => join(__dirname, '../../proto/user', file));

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE', // Identifier for the user service
        transport: Transport.GRPC,
        options: {
          package: 'user', // Package name from user.proto
          protoPath: protoUserFiles.filter((file) =>
            file.includes('user.proto'),
          ), // Only include user proto file(s)
        },
      },
      // {
      //   name: 'PRODUCT_SERVICE', // Identifier for the product service
      //   transport: Transport.GRPC,
      //   options: {
      //     package: 'product', // Package name from product.proto
      //     protoPath: protoUserFiles.filter((file) =>
      //       file.includes('product.proto'),
      //     ), // Only include product proto file(s)
      //   },
      // },
    ]),
  ],
})
export class GrpcModule {}
