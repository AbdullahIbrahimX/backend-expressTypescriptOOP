import { Schema } from "mongoose";

abstract class Model {
    abstract Name:string;
    abstract Schema:Schema;
    protected readonly abstract method:Array<any>;


}
