import {BaseEntity, Column, Entity, Index, ObjectID, ObjectIdColumn} from "typeorm";

export interface IContent {
    title:string;
    description:string;
    icon?:string;
    skills?:string;
    level?:number;
}

@Entity('cards')
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
    title:string;
    @Column()
    type:string;
    @Column()
    createdAt:Date = new Date();
    @Column()
    content:Array<object>;

    constructor(path: string, lang: string, index: number, title: string, type: string, content: Array<IContent>) {
        this.path = path;
        this.lang = lang;
        this.index = index;
        this.title = title;
        this.type = type;
        this.content = content;
    }

}
