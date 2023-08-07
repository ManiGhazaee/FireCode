import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user";
import { existsEmail, existsUsername } from "../utils/utils";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middlewares/token";
require("dotenv");

const accounts = express.Router();

accounts.post<
    {},
    { id?: string; token?: string; success: boolean; message: string },
    User
>("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Missing required fields.",
            });
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: "Email is not valid.",
            });
            return;
        }
        if (!passwordRegex.test(password)) {
            res.status(400).json({
                success: false,
                message: "Password is not valid. Password must contain at least one letter (uppercase or lowercase) and one digit, and must be at least 8 characters in length.",
            });
            return;
        }
        if (await existsUsername(username)) {
            res.status(409).json({
                success: false,
                message: "Username already exists.",
            });
            return;
        } else if (await existsEmail(email)) {
            res.status(409).json({
                success: false,
                message: "Email already exists.",
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

        const userFromDb = await UserModel.findOne({
            username: username,
            email: email,
            password: hashedPas,
        });

        const id = userFromDb ? userFromDb.id.toString() : "none";

        const token = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET!);
        res.status(201).json({
            token: token,
            id: id,
            success: true,
            message: "Account created successfully",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error creating account",
        });
    }
});

accounts.post<
    {},
    { id?: string; token?: string; success: boolean; message: string },
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
                id: user.id,
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

accounts.get("/:name", authenticateToken, async (req, res) => {
    const name = req.params.name;

    const user = await UserModel.findOne({
        username: name,
    });

    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
    }

    res.json(user);
});

accounts.get("/id/:id", authenticateToken, async (req, res) => {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
    }

    res.json(user);
});

export default accounts;
