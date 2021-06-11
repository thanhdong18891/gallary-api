import { Controller, Post , Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { Gallary } from '../entities/gallary.entity';

@Controller('gallary')
export class GallaryController {
    constructor(private readonly gallaryService: GallaryService){}
    @Post()
    addGallary(@Body() body: {title: string}):  Promise<Gallary> {
        return this.gallaryService.createGallary(body.title);
    }
    @Get()
    getAllGallaries(): Promise<Gallary[]> {
        return this.gallaryService.getAllGallaries();
      
    }
    @Get('download')
    async downloadGallaries(): Promise<Gallary[]> {
        const url = 'http://jsonplaceholder.typicode.com/albums';
        return await this.gallaryService.downloadGallaries(url);
    }
    @Get(':id')
    getGallary(@Param('id') id: number): Promise<Gallary> {
        return this.gallaryService.getGallaryById(id);
    }
    @Patch(':id')
    updateGallary(@Param('id') id: number, @Body() body: {title: string}):Promise<Gallary> {
        return this.gallaryService.updateGallary(id,body.title);
    }
    @Delete(':id')
    deleteGallary(@Param('id') id: number): Promise<Gallary>{
        return this.gallaryService.deleteGallary(id);
    }
}
