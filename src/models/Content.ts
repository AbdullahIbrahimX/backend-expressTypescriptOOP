import {BaseEntity, Column} from "typeorm";

export interface ContentType {
    _id?:string;
    title:string;
    institution_name:string;
    start_date:Date;
    end_date:Date;
    icon:string;
    level:number;
}

class Content extends BaseEntity{

    @Column()
    _id?:string;

    @Column()
    title!:string;
    @Column({nullable:true})
    institution_name?:string;
    @Column({nullable:true})
    start_date?:Date;
    @Column({nullable:true})
    end_date?:Date;
    @Column({nullable:true})
    icon?:string;
    @Column({nullable:true})
    level?:number;


}
export default Content;
