import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { GallaryModule } from '../gallary/gallary.module';
import { Photo } from '../entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]),GallaryModule],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
