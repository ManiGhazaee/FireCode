import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user";
import { existsEmail, existsUsername } from "../utils/utils";
import jwt from "jsonwebtoken";
require("dotenv");

const accounts = express.Router();

accounts.post<{}, { success: boolean; message: string }, User>(
    "/signup",
    async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
                return;
            }

            if (await existsUsername(username)) {
                res.status(409).json({
                    success: false,
                    message: "Username already exists",
                });
                return;
            } else if (await existsEmail(email)) {
                res.status(409).json({
                    success: false,
                    message: "Email already exists",
                });
                return;
            }

            const hashedPas = await bcrypt.hash(password, 10);

            const user: User = {
                username: username,
                email: email,
                password: hashedPas,
            };

            const userModel = new UserModel(user);
            await userModel.save();

            res.status(201).json({
                success: true,
                message: "Account created successfully",
            });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Error creating account",
            });
        }
    }
);

accounts.post<
    {},
    { token?: string; success: boolean; message: string },
    { username_or_email: string; password: string }
>("/login", async (req, res) => {
    const { username_or_email, password } = req.body;

    if (!username_or_email || !password) {
        res.status(400).json({
            success: false,
            message: "Missing required fields",
        });
        return;
    }

    try {
        const user = await UserModel.findOne({
            $or: [
                { username: username_or_email },
                { email: username_or_email },
            ],
        });

        if (user == null) {
            res.status(400).json({
                success: false,
                message: "Username or Email doesn't exists",
            });
            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                user.username,
                process.env.ACCESS_TOKEN_SECRET!
            );
            res.json({
                token: token,
                success: true,
                message: "Logged in successfully",
            });
        } else {
            res.json({ success: false, message: "Password incorrect" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Error" });
    }
});

export default accounts;
