import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";


@Entity("messages")
class Message extends BaseEntity{

    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    private email!: string;

    @Column()
    private message!: string;

    @Column()
    private name!: string;

    @Column()
    private read: boolean = false;

    @Column()
    private date: Date = new Date();

    constructor(email: string, message: string, name: string) {
        super();
        this.email = email;
        this.message = message;
        this.name = name;
    }
}

export default Message;
