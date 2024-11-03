import { PartialType } from '@nestjs/mapped-types';
import { CreateGrpcDto } from './create-grpc.dto';

export class UpdateGrpcDto extends PartialType(CreateGrpcDto) {
  id: number;
}
