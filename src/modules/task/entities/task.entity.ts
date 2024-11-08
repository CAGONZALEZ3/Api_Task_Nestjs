import { User } from "src/modules/user/entities/user.entity";
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Status } from "../enums/status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    title: string;

    @Column({nullable:true})
    description?: string;

    @Column({
        type:'enum',
        enum: Status,
        default: Status.PENDING,
    })
    status: Status

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => User, user => user.tasks, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({nullable:false})
    userId: number;
}
