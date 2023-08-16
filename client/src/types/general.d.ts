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
    status?: "solved" | "none" | "attempted" | string;
    is_starred?: boolean;
    like_status?: "liked" | "disliked" | "none" | string;
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
    submissions: Submission[] | undefined;
    problems_starred: string[];
    problems_solved: string[];
    problems_attempted: string[];
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
}

interface PublicUser {
    username: string;
    email: string;
    submissions: Submission[];
    problems_starred: string[];
    problems_solved: string[];
    easy_problems_count: number;
    medium_problems_count: number;
    hard_problems_count: number;
    problems_solved_easy: number;
    problems_solved_medium: number;
    problems_solved_hard: number;
    problems_attempted: string[];
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
}

type Sort = "asc" | "des" | "";
type AccaptanceSort = { acceptance_rate_count: Sort };
type TitleSort = { title: Sort };
type DifficultySort = { difficulty: Sort };
type SortOptions = DifficultySort & TitleSort & AccaptanceSort;

interface Navbar {
    items: NavbarItem[];
    default_active_item?: string | "none" | undefined;
    width_all?: string | undefined;
    color_all?: string | undefined;
    color_hover_all?: string | undefined;
    bg_color_hover_all?: string | undefined;
    bg_color_all?: string | undefined;
    active_color_all?: string | undefined;
    onclick_function_all?: Function | undefined;
    transition_duration_all?: string | undefined;
    font_size_all?: string | undefined;
    options_all?: any | undefined;
}

interface NavbarItem {
    text: string;
    link_path: string;
    onclick_function?: string | undefined;
    options?: any | undefined;
}

interface MainHeadingData {
    items?: MainHeadingItems[];
    username?: string;
    id?: string;
    status?: "loggedin" | "not-loggedin" | "none";
}

interface MainHeadingItems {
    text: string;
    link_path: string;
}

interface ProblemListData {
    main: {
        id: number;
        name: string;
        difficulty: "hard" | "medium" | "easy" | string;
        like_count: number;
        dislike_count: number;
        status: "solved" | "none" | "attempted" | string;
        is_starred: boolean;
        acceptance_rate_count: number;
    };
}

interface StarData {
    is_filled: boolean;
    width: string;
    height: string;
}

interface SubmissionsData {
    submissions_list: Submission[];
    is_submitted: boolean;
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
    code_body: string;
    input?: string;
    expected_output?: string;
    user_output?: string;
}
