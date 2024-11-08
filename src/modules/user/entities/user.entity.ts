import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from "typeorm";
import {genSalt, hash, compare} from 'bcryptjs';

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, nullable:false})
    email: string;

    @Column({nullable:false})
    password: string;

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

}
