import mongoose, { Document } from "mongoose";

interface DUser extends Document {
    username: string;
    email: string;
    password: string;
    submissions: Record<string, Submission[]> | undefined;
    problems_starred: Record<string, boolean> | undefined;
    problems_status: Record<string, DescriptionData["status"]> | undefined;
    problems_like_status:
        | Record<string, DescriptionData["like_status"]>
        | undefined;
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
    submissions: {
        type: Object,
        default: undefined,
    },
    problems_starred: {
        type: Object,
        default: undefined,
    },
    problems_status: {
        type: Object,
        default: undefined,
    },
    problems_like_status: {
        type: Object,
        default: undefined,
    },
});

const UserModel = mongoose.model<DUser>("User", userSchema);

export default UserModel;
