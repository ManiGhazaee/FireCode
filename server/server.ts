require("dotenv").config();
import express from "express";
import cors from "cors";
// import * as two_sum from "./constants/problems/two-sum.json";
// import { writeTestFile } from "./utils/createTest";
import router from "./routes/index";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI);

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// const problemsObject: Record<string, Json> = {
//     "two-sum": two_sum,
// };

const app: express.Application = express();
const port = 80;

app.use(cors());
app.use(express.json());

// app.post("/problem", (req, res) => {
//     console.log(req.body);

//     writeTestFile(req.body.code, two_sum.test, two_sum.function_name)
//         .then((resolve) => {
//             if (resolve.stdout != undefined) {
//                 console.log("stdout_string:", resolve.stdout_string);

//                 let submission: Submission = {
//                     status: resolve.stdout.status,
//                     error: resolve.stdout.error_message,
//                     time: resolve.stdout.date,
//                     runtime: resolve.stdout.runtime,
//                     language: "JavaScript",
//                     memory: Math.random() * 80,
//                     code_body: resolve.code_body,
//                     input: resolve.stdout.input,
//                     expected_output: resolve.stdout.expected_output,
//                     user_output: resolve.stdout.user_output,
//                 };
//                 res.json(submission);
//             }
//         })
//         .catch((e) => {
//             res.json({
//                 status: "Runtime Error",
//                 error: e,
//                 time: new Date(),
//                 runtime: 0,
//                 language: "JavaScript",
//                 memory: Math.random() * 80,
//                 code_body: undefined,
//             });
//         });
// });

// app.get("/problem/:name/editorial", (req, res) => {
//     const name = req.params.name;

//     if (name in problemsObject) {
//         const response = problemsObject[name].editorial;
//         res.json(response);
//     } else {
//         res.json({ status: "failure" });
//     }
// });

// app.get("/problem/:name", (req, res) => {
//     const name = req.params.name;

//     if (name in problemsObject) {
//         const response = problemsObject[name].main;
//         res.json(response);
//     } else {
//         res.json({ status: "failure" });
//     }
// });

app.use("/api", router);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});
