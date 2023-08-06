import express from "express";
import problem from "./problem";
import accounts from "./accounts";

const router = express.Router();

router.use("/problem", problem);
router.use("/accounts", accounts);

export default router;
