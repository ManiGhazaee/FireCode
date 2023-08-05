import express from "express";
import problem from "./problem";

const router = express.Router();

router.use("/problem", problem);

export default router;
