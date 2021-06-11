import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Photo } from "./photo.entity";
@Entity({ name: 'gallary' })
export class Gallary {
  @PrimaryGeneratedColumn()
  id: number = 0;
  @Column('varchar', {length: 200, nullable: true})
  title: string = "";
  @OneToMany(() => Photo, photo => photo.gallary)
  photos: Photo[];
}