import {Entity, PrimaryGeneratedColumn, Column, Index, getRepository, ManyToOne} from "typeorm";
import { Gallary } from './gallary.entity';
@Entity({ name: 'photo' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @Column('varchar', {length: 200, nullable: true})
  title: string = "";

  @Column('varchar', {length: 200, nullable: true})
  url: string = "";

  @ManyToOne(() => Gallary, gallary => gallary.photos)
  gallary: Gallary;
}