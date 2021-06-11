import { Module } from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { GallaryController } from './gallary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../config.service'
import {Gallary} from '../entities/gallary.entity';
@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),TypeOrmModule.forFeature([Gallary])],
  providers: [GallaryService],
  controllers: [GallaryController],
  exports: [GallaryService]
})
export class GallaryModule {}
