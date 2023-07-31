import React, { useState } from "react";
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
    const [isStarred, setIsStarred] = useState<boolean>(data.is_starred);

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
                            className={`ml-[20px] mt-[-3px] relative cursor-pointer transition ${
                                isStarred ? "starred" : "not-starred"
                            }`}
                            onClick={() => setIsStarred(!isStarred)}
                        >
                            {isStarred ? (
                                
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-star-fill absolute text-yellow-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px]" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-star absolute top-1/2 left-1/2 text-[#808080] -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px]"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                </svg>
                            )}
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
