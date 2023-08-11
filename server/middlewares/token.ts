import { NextFunction } from "express";
import express from "express";
import jwt from "jsonwebtoken";
require("dotenv");

interface UserRequest extends express.Request {
    user?: string;
}

export function authenticateToken(
    req: UserRequest,
    res: express.Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Token not provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ success: false, message: "Invalid token" });
        }
        req.user = decoded?.toString();
        next();
    });
}
