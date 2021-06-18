import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, OneToMany} from "typeorm";
import Content from "./Content";

enum types {
    skill="skill",
    experience="experience",
    education="education"
}

enum languages {
    Arabic="ar",
    English="en"
}

export interface PageType{
    title?:string;
    type?:types;
    index?:number;
    language?:languages;
}
@Entity('pages')
class Page extends BaseEntity{
    @ObjectIdColumn()
    _id!: ObjectID;

    @Column()
    title?:string;

    @Column()
    type?:types;

    @Column()
    index?:number;

    @Column()
    language?:languages;

    @Column(type=>Content)
    content!:Array<Content>;

}
export default Page;
