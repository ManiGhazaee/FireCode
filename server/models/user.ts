import mongoose, { Document } from "mongoose";

interface DUser extends Document {
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
    problems_starred: Array,
    problems_solved: Array,
    problems_attempted: Array,
    problems_solved_count: {
        type: Number,
        default: 0,
    },
    rank: Number,
    views: {
        type: Number,
        default: 0,
    },
    solution_count: {
        type: Number,
        default: 0,
    },
    reputation_count: {
        type: Number,
        default: 0,
    },
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;
