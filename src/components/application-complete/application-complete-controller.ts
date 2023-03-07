import {Request, Response} from "express";

export function applicationCompleteGet(req: Request, res: Response): void {
    res.render("application-complete/index.njk", {
        name: req.session.name
    });
}
