import {BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn, VersionColumn} from "typeorm";
import bcrypt from 'bcrypt';

@Entity("test")
class User {

    @ObjectIdColumn()
    private _id!: ObjectID;

    @Column()
    private name: string;

    @Column()
    private email: string;

    @Column()
    private password: string;

    @Column()
    private joinedIn: Date = new Date();

    constructor( name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @BeforeInsert()
    async encryptPassword() {
        const salt =await bcrypt.genSalt(10);
        this.password =await bcrypt.hash(this.password,salt);
    }




}

export default User;
