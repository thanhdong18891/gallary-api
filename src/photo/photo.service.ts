import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entities/photo.entity';
import { GallaryService } from '../gallary/gallary.service';
import axios from 'axios';
import ultilise from '../ultilise/ultilise';
import * as fs from "fs";
import * as path from "path";
import * as util from 'util';
@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) private photoRepository: Repository<Photo>,private readonly gallaryService: GallaryService){}

    async createPhoto(gallaryId: number, title: string, url:string): Promise<Photo> {
        const gallary = await this.gallaryService.getGallaryById(gallaryId);

        let photo = new Photo();
        photo.title = title;
        photo.url = url;
        photo.gallary = gallary;
        return this.photoRepository.save(photo);
    }
    getPhotoById(id: number): Promise<Photo> {
        try {
            const gallary = this.photoRepository.findOneOrFail(id);
            return gallary;
        } catch(err) {
            throw new NotFoundException('There is no record');
        }
    }
    async deletePhoto(id:number) {
        const photo = await this.getPhotoById(id);
        return this.photoRepository.remove(photo);
    }
    getAllPhotos(): Promise<Photo[]> {
        return this.photoRepository.find();
    }
    async downloadPhotos(gallaryId: number,url: string): Promise<Photo[]> {
        try {
            let dir = path.join(`${__dirname}/../../img/gallary-${gallaryId}`);
            let isExisted = await ultilise.checkFileExists(dir);
            const makeDir = util.promisify(fs.mkdir)
            if (!isExisted){
                await makeDir(dir)
                .then(async () => {
                    await this.download(gallaryId,url);
                })
            } else {
                await this.download(gallaryId,url);
            }
            
        } catch (error) {
            console.error(error);
        } 
        return null;    
    }
    async download(gallaryId: number, url: string) {
        const res = await axios.get(url).then(response => {
            response.data.map( x => {
                /* save db */
                // await this.createPhoto(x.albumId,x.title,x.url);
                /* create file and images on files */
                ultilise.downloadImage(gallaryId,x.url);
            });     
            return this.getAllPhotos(); 
        });
    }
}
