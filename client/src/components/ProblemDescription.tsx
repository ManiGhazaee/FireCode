import React from "react";
import { convertMarkdownToHtml } from "../ts/utils/utils";
import { changeCase } from "../ts/utils/string";

export interface DescriptionData {
    id: number;
    name: string;
    difficulty: "hard" | "medium" | "easy" | string;
    like_count: number;
    dislike_count: number;
    status: "solved" | "none" | "attempted" | string;
    is_starred: boolean;
    description_body: string;
    accept_count: number;
    submission_count: number;
    acceptance_rate_count: number;
    discussion_count: number;
    related_topics: string[];
    similar_questions: string[];
    solution_count: number;
}

const ProblemDescription = ({ data }: { data: DescriptionData }) => {
    return (
        <>
            {Object.keys(data).length !== 0 && (
                <div>
                    <h1 className="font-bold mt-[36px] ml-[26px]">
                        <span id="problem-id">{data.id}</span>. {data.name}
                    </h1>
                    <div className="flex flex-row ml-[26px] mt-[20px]">
                        <div
                            className={`${
                                data.difficulty === "easy"
                                    ? "text-green-500"
                                    : data.difficulty === "medium"
                                    ? "text-yellow-500"
                                    : "text-red-600"
                            }`}
                        >
                            {changeCase(data.difficulty, "pascal")}
                        </div>
                        <div
                            className={`ml-[10px] ${
                                data.status === "solved"
                                    ? "problem-solved"
                                    : data.status === "none"
                                    ? "problem-not-solved"
                                    : "problem-attempted"
                            }`}
                        >
                            {data.status === "solved"
                                ? "solved"
                                : data.status === "none"
                                ? "not-solved"
                                : "attempted"}
                        </div>
                        <div id="like-count" className="ml-[10px]">
                            likes: <span>{data.like_count}</span>
                        </div>
                        <div id="dislike-count" className="ml-[10px]">
                            dislikes: <span>{data.dislike_count}</span>
                        </div>
                        <div
                            className={`ml-[10px] ${
                                data.is_starred ? "starred" : "not-starred"
                            }`}
                        >
                            <span>
                                {data.is_starred ? "starred" : "not-starred"}
                            </span>
                        </div>
                    </div>
                    <div
                        id="description-body"
                        className="mt-[36px] ml-[26px] text-[14px]"
                        dangerouslySetInnerHTML={{
                            __html: convertMarkdownToHtml(
                                data.description_body
                            ),
                        }}
                    ></div>
                </div>
            )}
        </>
    );
};

export default ProblemDescription;
