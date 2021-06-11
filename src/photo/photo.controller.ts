import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from '../entities/photo.entity';
@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService){}
    @Post()
    async addGallary(@Body() body: {gallaryId: number,title: string, url:string}):  Promise<Photo> {
        return await this.photoService.createPhoto(body.gallaryId,body.title,body.url);
    }
    @Delete(':id')
    deleteGallary(@Param('id') id: number): Promise<Photo>{
        return this.photoService.deletePhoto(id);
    }
    @Get('download/:gallaryId')
    async downloadGallaries(@Param('gallaryId') gallaryId: number){
        const url = `http://jsonplaceholder.typicode.com/photos?albumId=${gallaryId}`;
        return await this.photoService.downloadPhotos(gallaryId,url);
    }
}
