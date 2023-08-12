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
