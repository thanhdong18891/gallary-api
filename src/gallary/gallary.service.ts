import { Injectable, NotFoundException } from '@nestjs/common';
import  Ultilise from '../ultilise/ultilise';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallary } from '../entities/gallary.entity';
import { Repository } from 'typeorm';
@Injectable()
export class GallaryService {
    constructor(@InjectRepository(Gallary) private gallaryRepository: Repository<Gallary>){}
    getAllGallaries(): Promise<Gallary[]> {
        return this.gallaryRepository.find();
    }
    getGallaryById(id: number): Promise<Gallary> {
        try {
            const gallary = this.gallaryRepository.findOneOrFail(id);
            return gallary;
        } catch(err) {
            throw new NotFoundException('There is no record');
        }
    }
    createGallary(title: string): Promise<Gallary>{
        const newGallary = this.gallaryRepository.create({title});
        return this.gallaryRepository.save(newGallary);
    }

    async updateGallary(id:number,title: string): Promise<Gallary> {
        const gallary = await this.getGallaryById(id);
        gallary.title = title;
        return this.gallaryRepository.save(gallary);
    }
    
    async deleteGallary(id:number) {
        const gallary = await this.getGallaryById(id);
        return this.gallaryRepository.remove(gallary);
    }
    async downloadGallaries(url: string): Promise<Gallary[]> {
        try {
            const res = await axios.get(url).then(response => {
                response.data.map( async x => {
                    await this.createGallary(x.title);
                });      
            });
            return this.getAllGallaries();
        } catch (error) {
            console.error(error);
        } 
        return null;    
    }
}
