import express, { json } from "express";
import { writeTestFile } from "../utils/createTest";
import ProblemModel from "../models/problem";
import UserModel from "../models/user";
import { DProblem } from "../models/problem";
import {
    sortByAcceptance,
    sortByDifficulty,
    sortByTitle,
} from "../utils/utils";

const problem = express.Router();

problem.post("/all", async (req, res) => {
    const { id } = req.body;
    const search = req.query.search || "";
    const difficulty = req.query.difficulty || "";
    const acceptance = req.query.acceptance || "";
    const title = req.query.title || "";

    try {
        const allProblems = await ProblemModel.find(
            { "main.name": { $regex: search, $options: "i" } },
            "main.id main.name main.acceptance_rate_count main.difficulty main.like_count main.dislike_count"
        )
            .sort({ "main.id": 1 })
            .exec();

        const allProblemsSorted = sortByAcceptance(
            acceptance.toString() as Sort,
            sortByDifficulty(
                difficulty.toString() as Sort,
                sortByTitle(title.toString() as Sort, allProblems)
            )
        );

        const user = await UserModel.findById(id);
        const sOrA = {
            solved: user?.problems_solved,
            attempted: user?.problems_attempted,
        };

        let allProblemsArray: DProblem[] = JSON.parse(
            JSON.stringify(allProblemsSorted)
        );

        if (sOrA.attempted) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.attempted.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "attempted";
                }
            }
        }
        if (sOrA.solved) {
            for (let i = 0; i < allProblemsArray.length; i++) {
                if (sOrA.solved.includes(allProblemsArray[i].main.name)) {
                    allProblemsArray[i].main.status = "solved";
                }
            }
        }

        res.json(allProblemsArray);
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Internal Server Error" });
    }
});

problem.post<
    { name: string },
    Submission[],
    { code: string; id: string; problem_name: string }
>("/submit/:name", async (req, res) => {
    const { name } = req.params;
    const { id, problem_name } = req.body;

    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });
        const user = await UserModel.findById(id);
        if (!user) {
            res.json([
                {
                    problem_name: problem_name,
                    status: "Runtime Error",
                    error: "user not found",
                    time: new Date(),
                    runtime: 0,
                    language: "JavaScript",
                    memory: Math.random() * 80,
                    code_body: undefined,
                },
            ]);
            return;
        }
        let history: Submission[] | null;
        if (user.submissions) {
            history = user.submissions;
        } else {
            history = null;
        }
        if (problem) {
            writeTestFile(req.body.code, problem.test, problem.function_name)
                .then(async (resolve) => {
                    if (resolve.stdout != undefined) {
                        console.log(resolve.stdout);
                        let submission: Submission[] = [
                            {
                                problem_name: problem_name,
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
                            },
                        ];
                        if (history != null) {
                            submission.push(...history);
                        }

                        const subsByName = submission.filter(
                            (elem) => elem.problem_name === problem_name
                        );
                        user.submissions = submission;

                        if (submission[0].status === "Accepted") {
                            if (!user.problems_solved.includes(problem_name)) {
                                user.problems_solved.push(problem_name);
                                user.problems_solved_count += 1;
                            }
                        } else {
                            if (
                                !user.problems_attempted.includes(problem_name)
                            ) {
                                user.problems_attempted.push(problem_name);
                            }
                        }
                        await user.save();
                        res.json(subsByName);
                    }
                })
                .catch(async (e) => {
                    let submission: Submission[] = [
                        {
                            problem_name: problem_name,
                            status: "Runtime Error",
                            error: e,
                            time: new Date(),
                            runtime: 0,
                            language: "JavaScript",
                            memory: Math.random() * 80,
                            code_body: undefined,
                        },
                    ];
                    if (history) {
                        submission.push(...history);
                    }

                    if (!user.problems_attempted.includes(problem_name)) {
                        user.problems_attempted.push(problem_name);
                    }

                    const subsByName = submission.filter(
                        (elem) => elem.problem_name === problem_name
                    );

                    user.submissions = submission;
                    await user.save();
                    res.json(subsByName);
                });
        }
    } catch (e) {
        console.log(e);
    }
});

problem.post<{ name: string }, Submission[], { id: string }>(
    "/submissions/:name",

    async (req, res) => {
        const { name } = req.params;
        const { id } = req.body;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                res.json([]);
                return;
            }
            if (!user.submissions) {
                res.json([]);
                return;
            }

            const subsByName = user.submissions.filter(
                (elem) => elem.problem_name === name
            );

            res.json(subsByName);
        } catch (e) {
            console.log(e);
            res.json([]);
        }
    }
);

problem.post("/:name", async (req, res) => {
    const { name } = req.params;
    const { id } = req.body;
    try {
        const problem = await ProblemModel.findOne({
            "main.name": name,
        });

        const user = await UserModel.findById(id);
        const problemJson: DProblem = JSON.parse(JSON.stringify(problem));

        if (user?.problems_attempted.includes(name)) {
            problemJson.main.status = "attempted";
        }
        if (user?.problems_solved.includes(name)) {
            problemJson.main.status = "solved";
        }

        if (problemJson) {
            const response = problemJson;
            res.json(response);
        } else {
            res.json({ error: "problem not found" });
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
