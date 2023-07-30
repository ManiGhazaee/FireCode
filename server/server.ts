import express from "express";
import cors from "cors";
import * as two_sum from "./constants/problems/two-sum.json";

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
}

export interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
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
    res.json({ status: "success" });
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

console.log(two_sum);
