type ProblemData = CodeData & DescriptionData;

interface CodeData {
    code_default_language: string;
    code_body: Record<string, string>;
    testcases?: TestCase[];
}

interface DescriptionData {
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

interface EditorialData {
    editorial_body: string;
}

interface Json {
    main: ProblemData;
    editorial: EditorialData;
}

interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
}

interface ProblemPageData {
    activeNavOption?: string | undefined;
}

interface SidePanelData {
    username: string;
}

interface User {
    username: string;
    email: string;
    password: string;
    submissions: Record<string, Submission[]> | undefined;
    problems_starred: Record<string, boolean> | undefined;
    problems_status: Record<string, DescriptionData["status"]> | undefined;
    problems_like_status:
        | Record<string, DescriptionData["like_status"]>
        | undefined;
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
}
