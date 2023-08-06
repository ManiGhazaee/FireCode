import express from "express";
import { writeTestFile } from "../utils/createTest";
import ProblemModel from "../models/problem";


const problem = express.Router();

problem.get("/:name", async (req, res) => {
    const name = req.params.name;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });

        console.log(problem);
        if (problem) {
            const response = problem;
            res.json(response);
        } else {
            res.json({ error: "problem not found" });
        }
    } catch (e) {
        console.log(e);
    }
});

problem.post("/:name", async (req, res) => {
    console.log(req.body);
    const name = req.params.name;

    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        if (problem) {
            writeTestFile(req.body.code, problem.test, problem.function_name)
                .then((resolve) => {
                    if (resolve.stdout != undefined) {
                        console.log("stdout_string:", resolve.stdout_string);

                        let submission: Submission = {
                            status: resolve.stdout.status,
                            error: resolve.stdout.error_message,
                            time: resolve.stdout.date,
                            runtime: resolve.stdout.runtime,
                            language: "JavaScript",
                            memory: Math.random() * 80,
                            code_body: resolve.code_body,
                            input: resolve.stdout.input,
                            expected_output: resolve.stdout.expected_output,
                            user_output: resolve.stdout.user_output,
                        };
                        res.json(submission);
                    }
                })
                .catch((e) => {
                    res.json({
                        status: "Runtime Error",
                        error: e,
                        time: new Date(),
                        runtime: 0,
                        language: "JavaScript",
                        memory: Math.random() * 80,
                        code_body: undefined,
                    });
                });
        }
    } catch (e) {
        console.log(e);
    }
});

problem.get("/:name/editorial", async (req, res) => {
    const name = req.params.name;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        if (problem) {
            const response = problem.editorial;
            res.json(response);
        }
    } catch (e) {
        console.log(e);
    }
});

export default problem;
