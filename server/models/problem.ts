import mongoose, { Document } from "mongoose";

export interface DProblem extends Document {
    main: ProblemData;
    editorial: EditorialData;
    test: any[][];
    function_name: string;
}

const problemSchema = new mongoose.Schema<DProblem>({
    main: {
        id: Number,
        name: String,
        difficulty: String,
        like_count: Number,
        dislike_count: Number,
        description_body: String,
        accept_count: Number,
        submission_count: Number,
        acceptance_rate_count: Number,
        discussion_count: Number,
        related_topics: Array,
        similar_questions: Array,
        solution_count: Number,
        code_default_language: String,
        code_body: Object,
    },
    editorial: {
        editorial_body: String,
    },
    test: Array,
    function_name: String,
});

const ProblemModel = mongoose.model<DProblem>("Problem", problemSchema);

export default ProblemModel;
