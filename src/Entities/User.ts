import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
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
    joinedin!: Date;
}

export default User;
