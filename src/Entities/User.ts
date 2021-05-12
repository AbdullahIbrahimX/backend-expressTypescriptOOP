import {Column, Entity, ObjectID, ObjectIdColumn, VersionColumn} from "typeorm";

@Entity("test")
class User {

    @ObjectIdColumn()
    id!: ObjectID;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    joinedIn: Date = new Date();

}

export default User;