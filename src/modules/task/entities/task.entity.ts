import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export enum Status {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
};

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
}
