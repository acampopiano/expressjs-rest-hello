import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity
} from 'typeorm';
import { Todos } from './Todos';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;  
  
  @OneToMany(() => Todos, todos => todos.user)
  todos: Todos[];
}