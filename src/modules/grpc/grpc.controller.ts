import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GrpcService } from './grpc.service';
import { CreateGrpcDto } from './dto/create-grpc.dto';
import { UpdateGrpcDto } from './dto/update-grpc.dto';

@Controller()
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  @MessagePattern('createGrpc')
  create(@Payload() createGrpcDto: CreateGrpcDto) {
    return this.grpcService.create(createGrpcDto);
  }

  @MessagePattern('findAllGrpc')
  findAll() {
    return this.grpcService.findAll();
  }

  @MessagePattern('findOneGrpc')
  findOne(@Payload() id: number) {
    return this.grpcService.findOne(id);
  }

  @MessagePattern('updateGrpc')
  update(@Payload() updateGrpcDto: UpdateGrpcDto) {
    return this.grpcService.update(updateGrpcDto.id, updateGrpcDto);
  }

  @MessagePattern('removeGrpc')
  remove(@Payload() id: number) {
    return this.grpcService.remove(id);
  }
}
