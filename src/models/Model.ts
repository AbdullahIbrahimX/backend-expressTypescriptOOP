import {ObjectIdColumn, VersionColumn} from "typeorm";


export abstract class Model{
    @ObjectIdColumn()
    _id!:string;


}
