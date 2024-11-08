import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {genSalt, hash, compare} from 'bcryptjs';
import { Task } from "src/modules/task/entities/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, nullable:false})
    email: string;

    @Column({nullable:false, select:false})
    password: string;

    @Column({nullable:true})
    name?: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if (this.password){
            const salt = await genSalt(10);
            this.password = await hash(this.password,salt);
        }
    };

    async comparePassword(password: string): Promise<boolean>{
        return compare(password, this.password);
    }

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

}
