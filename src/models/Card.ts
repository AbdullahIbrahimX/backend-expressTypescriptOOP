import {BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn} from "typeorm";

export interface IContent {
    title:string;
    description:string;
    icon?:string;
    skills?:string;
    level?:number;
}

@Entity('cardstest')
export class Card {
    @ObjectIdColumn()
    _id!: ObjectID;
    @Column()
    path:string;
    @Column()
    lang:string;
    @Column()
    index:number;
    @Column()
    @Index()
    title:string;
    @Column()
    type:string;
    @Column()
    createdAt:Date = new Date();
    @Column()
    content:Array<IContent>;

    constructor(path: string, lang: string, index: number, title: string, type: string, content: Array<IContent>) {
        this.path = path;
        this.lang = lang;
        this.index = index;
        this.title = title;
        this.type = type;
        this.content = content;
    }

}
