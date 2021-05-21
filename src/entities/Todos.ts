import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity, JoinTable
} from 'typeorm';
import { Users } from "./Users";
@Entity()
export class Todos extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    done: Boolean;
    @Column()
    date_created: Date;
    @Column()
    date_modified: Date;
    
    @ManyToOne(() => Users, users => users.todos)
    users: Users;
}