import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    BaseEntity, JoinTable, JoinColumn, Timestamp
} from 'typeorm';
import { User } from "./User";
@Entity()
export class Todos extends BaseEntity {
    @PrimaryGeneratedColumn()
    todo_id: number;
    @Column()
    done: Boolean;
    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    date_created: Date;
    @Column({nullable:true})
    date_modified: Date;
    
    @ManyToOne(() => User, user => user.todos, {
        cascade: true,
    })
    @JoinColumn({ name: 'user_id' }) //aqui le pongo un nombre a la fk que hace la relacion con usuario, y no el que pone por default typeorm
    user: User;
}