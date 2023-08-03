import express from "express";
import cors from "cors";
import * as two_sum from "./constants/problems/two-sum.json";
import { writeTestFile } from "./utils/createTest";

type ProblemData = CodeData & DescriptionData;

export interface CodeData {
    code_default_language: string;
    code_body: Record<string, string>;
    testcases?: TestCase[];
}

export interface DescriptionData {
    id: number;
    name: string;
    difficulty: "hard" | "medium" | "easy" | string;
    like_count: number;
    dislike_count: number;
    status: "solved" | "none" | "attempted" | string;
    is_starred: boolean;
    like_status: "liked" | "disliked" | "none" | string;
    description_body: string;
    accept_count: number;
    submission_count: number;
    acceptance_rate_count: number;
    discussion_count: number;
    related_topics: string[];
    similar_questions: string[];
    solution_count: number;
}

export interface EditorialData {
    editorial_body: string;
}

export interface Json {
    main: ProblemData;
    editorial: EditorialData;
    test: any[][];
}

export interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
}

export interface Submission {
    status:
        | "Accepted"
        | "Runtime Error"
        | "Wrong Answer"
        | "Time Limit Exceeded";
    error?: string;
    runtime: number;
    memory: number;
    language: "JavaScript";
    time: Date;
    code_body: string;
    input?: string;
    expected_output?: string;
    user_output?: string;
}

const problemsObject: Record<string, Json> = {
    "two-sum": two_sum,
};

const app: express.Application = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/problem", (req, res) => {
    console.log(req.body);

    writeTestFile(req.body.code, two_sum.test, two_sum.function_name)
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
});

app.get("/problem/:name/editorial", (req, res) => {
    const name = req.params.name;

    if (name in problemsObject) {
        const response = problemsObject[name].editorial;
        res.json(response);
    } else {
        res.json({ status: "failure" });
    }
});

app.get("/problem/:name", (req, res) => {
    const name = req.params.name;

    if (name in problemsObject) {
        const response = problemsObject[name].main;
        res.json(response);
    } else {
        res.json({ status: "failure" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
