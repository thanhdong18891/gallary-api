import { Module } from '@nestjs/common';
import { GallaryModule } from './gallary/gallary.module';
import { PhotoModule } from './photo/photo.module';
@Module({
  imports: [GallaryModule, PhotoModule]
})
export class AppModule {}
