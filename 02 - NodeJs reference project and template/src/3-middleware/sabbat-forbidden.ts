import { NextFunction, Request, Response } from "express";

function sabbatForbidden(request: Request, response: Response, next: NextFunction) {
    if (isSaturday()) {
        response.send("Sorry, Sabbat today...");
    }
    else {
        next();
    }
}

function isSaturday(): boolean {
    const now = new Date();
    const day = now.getDay() + 1;
    const hour = now.getHours();
    return day === 6 && hour >= 17 || day === 7 && hour < 17;
}

export default sabbatForbidden;
