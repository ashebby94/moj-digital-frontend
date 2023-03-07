import express from "express";
import * as path from "path";
import * as nunjucks from "nunjucks";
import {Environment} from "nunjucks";
import session from 'express-session'
import cookieParser from "cookie-parser";

import {landingRouter} from "./components/landing/landing-route";
import {applicationCompleteRouter} from "./components/application-complete/application-complete-route";

export function configureNunjucks(
    app: express.Application,
    viewsPath: string[]
): Environment {
    return nunjucks.configure(viewsPath, {
        autoescape: true,
        express: app,
        noCache: true,
    });
}

const APP_VIEWS = [
    path.join(__dirname, "components"),
];

function registerRoutes(app: express.Application) {
    app.use(landingRouter);
    app.use(applicationCompleteRouter);
}

declare module "express-session" {
    interface SessionData {
        name: string;
        countries: any;
    }
}

async function createApp(): Promise<express.Application> {
    const app: express.Application = express();

    app.set("trust proxy", 1);
    const sess = {
        secret: 'moj-digital-secret',
        cookie: {
            secure: false, maxAge: 6000000
        },
        saveUninitialized: true,
        resave: false,
    }
    app.use(session(sess))
    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use("/assets", express.static(path.resolve("node_modules/govuk-frontend/govuk/assets")));
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.set("view engine", configureNunjucks(app, APP_VIEWS));

    registerRoutes(app);

    return app;
}

export {createApp};

