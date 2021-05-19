import {
    BaseEntity,
    BeforeInsert, BeforeUpdate,
    Column,
    Entity,
    ObjectID,
    ObjectIdColumn,
} from "typeorm";
import bcrypt from 'bcrypt';
import {IsDate, IsEmail, IsString, Min} from "class-validator";

@Entity("usersTest")
export default class User extends BaseEntity{

    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    private name: string;

    @Column()
    @IsEmail()
    private email: string;

    @Column({select:false})
    @IsString()
    @Min(8)
    private password!: string;

    @Column()
    @IsDate()
    private readonly joinedIn: Date = new Date();


    constructor( name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }


    //-------- rules --------//

    @BeforeInsert()
    async encryptPassword() {
        const salt =await bcrypt.genSalt(10);
        this.password =await bcrypt.hash(this.password,salt);
    }

    //-------- Services --------//
    async isPasswordMatch(password: string, callback: Function) {
        await bcrypt.compare(password, this.password, (err: Error, success: boolean) => {
            if (err) {
                return callback(err);
            }
            return callback(null, success);
        });
    }

    updateUserData(name?: string, email?: string, password?: string){
        password? this.password = password: null;
        name? this.name = name: null;
        email? this.email = email : null;
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

