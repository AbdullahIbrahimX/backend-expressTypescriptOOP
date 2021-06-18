import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";


@Entity("messages")
class Message extends BaseEntity{

    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
     email!: string;

    @Column()
     message!: string;

    @Column()
     name!: string;

    @Column()
     read: boolean = false;

    @Column()
     date: Date = new Date();

}

export default Message;
