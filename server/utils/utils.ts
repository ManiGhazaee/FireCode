import { Types } from "mongoose";
import UserModel from "../models/user";
import { Document } from "mongoose";
import { DProblem } from "../models/problem";

export async function existsUsername(username: string) {
    const user = await UserModel.findOne({ username: username });
    return !(user == null);
}

export async function existsEmail(email: string) {
    const user = await UserModel.findOne({ email: email });
    return !(user == null);
}

export function sortByDifficulty(
    order: Sort,
    arr: (Document<unknown, {}, DProblem> &
        DProblem & {
            _id: Types.ObjectId;
        })[]
) {
    if (order === "") return arr;
    const difficultyRule = { easy: 1, medium: 2, hard: 3 };
    if (order === "asc") {
        return arr.sort(
            (a, b) =>
                difficultyRule[a.main.difficulty] -
                difficultyRule[b.main.difficulty]
        );
    } else {
        return arr.sort(
            (a, b) =>
                difficultyRule[b.main.difficulty] -
                difficultyRule[a.main.difficulty]
        );
    }
}

export function sortByAcceptance(
    order: Sort,
    arr: (Document<unknown, {}, DProblem> &
        DProblem & {
            _id: Types.ObjectId;
        })[]
) {
    if (order === "") return arr;
    if (order === "asc") {
        return arr.sort(
            (a, b) =>
                b.main.acceptance_rate_count - a.main.acceptance_rate_count
        );
    } else {
        return arr.sort(
            (a, b) =>
                a.main.acceptance_rate_count - b.main.acceptance_rate_count
        );
    }
}

export function sortByTitle(
    order: Sort,
    arr: (Document<unknown, {}, DProblem> &
        DProblem & {
            _id: Types.ObjectId;
        })[]
) {
    if (order === "") return arr;
    if (order === "asc") {
        return arr.sort((a, b) => a.main.id - b.main.id);
    } else {
        return arr.sort((a, b) => b.main.id - a.main.id);
    }
}
