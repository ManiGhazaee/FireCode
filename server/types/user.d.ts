interface User {
    username: string;
    email: string;
    password: string;
    submissions?: Record<string, Submission[]> | undefined;
    problems_starred?: Record<string, boolean> | undefined;
    problems_status?: Record<string, DescriptionData["status"]> | undefined;
    problems_like_status?:
        | Record<string, DescriptionData["like_status"]>
        | undefined;
}
