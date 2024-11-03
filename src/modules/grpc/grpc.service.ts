import { Injectable } from '@nestjs/common';
import { CreateGrpcDto } from './dto/create-grpc.dto';
import { UpdateGrpcDto } from './dto/update-grpc.dto';

@Injectable()
export class GrpcService {
  create(createGrpcDto: CreateGrpcDto) {
    return 'This action adds a new grpc';
  }

  findAll() {
    return `This action returns all grpc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grpc`;
  }

  update(id: number, updateGrpcDto: UpdateGrpcDto) {
    return `This action updates a #${id} grpc`;
  }

  remove(id: number) {
    return `This action removes a #${id} grpc`;
  }
}
