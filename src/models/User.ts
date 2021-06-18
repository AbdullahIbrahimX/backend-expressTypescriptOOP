import {BaseEntity, BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import bcrypt from 'bcrypt';
import {IsDate, IsEmail, IsString, MinLength} from "class-validator";
import bcryptHash from "../config/bcryptHash";
import {Error} from "mongoose";

@Entity("users")
export default class User extends BaseEntity{
    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    name!: string;

    @Column({unique:true})
    @IsEmail()
    email!: string;

    @Column({select:false})
    @IsString()
    @MinLength(8)
    password!: string;

    @Column()
    @IsDate()
    joinedIn: Date = new Date();

    //-------- rules --------//

    @BeforeInsert()
    async encryptPassword() {
        this.password = await bcryptHash(this.password, 10);
    }

    //-------- Services --------//
    async isPasswordMatch(password: string, callback: (error?:Error,match?:boolean)=>void){
        await bcrypt.compare(password, this.password, (err: Error, success: boolean) => {
            if (err) {
                callback(err,undefined);
            }
            callback(undefined,success);
        });
    }


    async updateUserData(name?: string, email?: string, password?: string) {
        name ? this.name = name : null;
        email ? this.email = email : null;
        if (password) {
            this.password = await bcryptHash(password, 10);
        }
    }


    getUserData(){
        return{
            joinedIn: this.joinedIn,
            name:this.name,
            email:this.email,
            _id:this._id
        }
    }


}

