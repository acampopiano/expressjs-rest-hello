import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
  BaseEntity, JoinTable
} from 'typeorm';
import {Users} from "./Users";
@Entity()
export class Todos extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  done: Boolean;
  @Column()
  date_created: Date;
  @Column()
  date_modified: Date;    


}