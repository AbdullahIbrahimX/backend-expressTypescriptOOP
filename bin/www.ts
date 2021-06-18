import App from "../app";
import express from 'express';
import {RequestHandler} from "express";
import cookieParser = require("cookie-parser");
const passport = require('passport');
import {initialize,session} from 'passport'
import morgan from "morgan";
import cors from 'cors'
import Controller from "../src/controllers/Controller";
import passportConf from "../src/config/passportConf";
import {MessageCtrl} from "../src/controllers/MessageCtrl";
import {UserCtrl} from "../src/controllers/UserCtrl";
import {Server} from "socket.io";
import SocketIOControllers from "../src/controllers/websockets/SocketIOControllers";
import {testSocketCtrl} from "../src/controllers/websockets/testSocketCtrl";
import MainRoutSocketCtrl from "../src/controllers/websockets/mainRoutSocketCtrl";
import 'reflect-metadata'
import PageCtrl from "../src/controllers/PageCtrl";
import ContentCtrl from "../src/controllers/ContentCtrl";

// @ts-ignore
const PORT = parseInt(process.env.PORT) || 3000;
const websocketServer = new Server;
const app = new App(express(),PORT,websocketServer);

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
    new UserCtrl,
    new MessageCtrl,
    new PageCtrl,
    new ContentCtrl
    ]

const websocketControllers:Array<SocketIOControllers> = [
    new testSocketCtrl(websocketServer),
    new MainRoutSocketCtrl(websocketServer)
]

Promise.resolve()
    .then(async ()=>{
        await app.initDB()
    }).then(async ()=>{
        app.useMiddleware(middlewares);
        passportConf(passport);
        app.useControllers(routesController);
        app.run();
        app.loadWebsocketControllers(websocketControllers);
        app.runHttp()
    });
