import App from "../app";
import express from 'express';
import * as mongoose from 'mongoose';
import {RequestHandler} from "express";
import cookieParser = require("cookie-parser");
import {initialize,session} from "passport";
import morgan from "morgan";
import cors from 'cors'
import UserCtrl from "../src/controllers/UserCtrl";
import Controller from "../src/controllers/Controller";

// @ts-ignore
const PORT = parseInt(process.env.PORT) || 3000;
const app = new App(express(),mongoose,PORT);

const middlewares: Array<RequestHandler> = [
    morgan("dev"),
    cors(),
    express.json(),
    express.urlencoded({extended:false}),
    cookieParser(),
    initialize(),
    session(),
    ]

const routesController: Array<Controller> =[
    new UserCtrl
    ]

Promise.resolve()
    .then(async ()=>{
        await app.initDB()
    }).then(()=>{
        app.useMiddleware(middlewares);
        app.loadControllers(routesController);
        app.run();
});
