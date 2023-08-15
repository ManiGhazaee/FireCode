type ProblemData = CodeData & DescriptionData;

interface Problem {
    main: ProblemData;
    editorial: EditorialData;
    test: any[][];
    function_name: string;
}

interface CodeData {
    code_default_language: string;
    code_body: Record<string, string>;
    testcases?: TestCase[];
}

interface DescriptionData {
    id: number;
    name: string;
    difficulty: "hard" | "medium" | "easy";
    like_count: number;
    dislike_count: number;
    status: "solved" | "none" | "attempted";
    is_starred: boolean;
    like_status: "liked" | "disliked" | "none";
    description_body: string;
    accept_count: number;
    submission_count: number;
    acceptance_rate_count: number;
    discussion_count: number;
    related_topics: string[];
    similar_questions: string[];
    solution_count: number;
}

interface EditorialData {
    editorial_body: string;
}

interface Json {
    main: ProblemData;
    editorial: EditorialData;
    test: any[][];
    function_name: string;
}

interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
}

interface Submission {
    problem_name: string;
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
    code_body?: string;
    input?: string;
    expected_output?: string;
    user_output?: string;
}

type Sort = "asc" | "des" | "";
