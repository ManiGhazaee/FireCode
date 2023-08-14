import { NextFunction } from "express";
import express from "express";

export function customCors(
    req: express.Request,
    res: express.Response,
    next: NextFunction
) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
}
