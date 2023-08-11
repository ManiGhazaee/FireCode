import mongoose, { Document } from "mongoose";

interface DUser extends Document {
    username: string;
    email: string;
    password: string;
    submissions: Submission[] | undefined;
    problems_starred: Record<string, boolean> | undefined;
    problems_status: Record<string, DescriptionData["status"]> | undefined;
    problems_solved: string[];
    problems_attempted: string[];
    problems_like_status:
        | Record<string, DescriptionData["like_status"]>
        | undefined;
    problems_solved_count: number;
    rank: number;
    views: number;
    solution_count: number;
    reputation_count: number;
}

const userSchema = new mongoose.Schema<DUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    submissions: Array,
    problems_starred: {
        type: Object,
        default: undefined,
    },
    problems_status: {
        type: Object,
        default: undefined,
    },
    problems_solved: Array,
    problems_attempted: Array,
    problems_like_status: {
        type: Object,
        default: undefined,
    },
    problems_solved_count: Number,
    rank: Number,
    views: Number,
    solution_count: Number,
    reputation_count: Number,
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;
