import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {genSalt, hash, compare} from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, nullable:false})
    email: string;

    @Column({nullable:false})
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

}
