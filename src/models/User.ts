import {
    BeforeInsert,
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
    Unique,
} from "typeorm";
import bcrypt from 'bcrypt';

@Entity("users")
@Unique(["email"])
class User {

    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    private name!: string;

    @Column()
    private email!: string;

    @Column()
    password!: string;

    @Column()
    joinedIn: Date = new Date();


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

    async isPasswordMatch(password: string, hashedPassword: string, callback: Function) {
        await bcrypt.compare(password, hashedPassword, (err: Error, success: boolean) => {
            if (err) {
                return callback(err);
            }
            return callback(null, success);
        });
    }


}

export default User;
