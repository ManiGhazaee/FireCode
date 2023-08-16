import React, { useState } from "react";
import { convertMarkdownToHtml } from "../ts/utils/utils";
import { changeCase, kebabToSpacedPascal } from "../ts/utils/string";
import StarIcon from "./StarIcon";

const ProblemDescription = ({ data }: { data: DescriptionData }) => {
    const [isStarred, setIsStarred] = useState<boolean>(
        data.is_starred || false
    );
    const [likeStatus, setLikeStatus] = useState<string>(
        data.like_status || "none"
    );
    return (
        <>
            {Object.keys(data).length !== 0 && (
                <div>
                    <h1 className="font-bold mt-[36px] ml-[26px] text-[22px]">
                        <span id="problem-id">{data.id}</span>.{" "}
                        {kebabToSpacedPascal(data.name)}
                    </h1>
                    <div className="flex flex-row ml-[26px] mt-[20px] select-none">
                        <div
                            className={`${
                                data.difficulty === "easy"
                                    ? "text-green-500"
                                    : data.difficulty === "medium"
                                    ? "text-orange-500"
                                    : "text-red-600"
                            }`}
                        >
                            {changeCase(data.difficulty, "pascal")}
                        </div>
                        <div
                            className={`ml-[20px] text-[20px] mt-[-1px]  ${
                                data.status === "solved"
                                    ? "problem-solved"
                                    : data.status === "none"
                                    ? "problem-not-solved"
                                    : "problem-attempted"
                            }`}
                        >
                            {data.status === "solved" ? (
                                <i
                                    className="bi bi-check-circle"
                                    style={{ color: "#22c55e" }}
                                ></i>
                            ) : data.status === "attempted" ? (
                                <i
                                    className="bi bi-x-circle"
                                    style={{ color: "#f97316" }}
                                ></i>
                            ) : (
                                ""
                            )}
                        </div>
                        <div id="like-count" className="ml-[20px] mt-[-2px]">
                            <span
                                className="text-[#808080] text-[20px] cursor-pointer mr-[5px]"
                                onClick={() =>
                                    likeStatus === "disliked" ||
                                    likeStatus === "none"
                                        ? setLikeStatus("liked")
                                        : setLikeStatus("none")
                                }
                            >
                                {likeStatus === "liked" ? (
                                    <i className="bi bi-hand-thumbs-up-fill text-green-600"></i>
                                ) : (
                                    <i className="bi bi-hand-thumbs-up"></i>
                                )}
                            </span>
                            {data.like_count != undefined && (
                                <span className="text-[#808080] text-[14px]">
                                    {data.like_count}
                                </span>
                            )}
                        </div>
                        <div id="dislike-count" className="ml-[20px] mt-[-1px]">
                            <span
                                className="text-[#808080] text-[20px] cursor-pointer mr-[5px]"
                                onClick={() =>
                                    likeStatus === "liked" ||
                                    likeStatus === "none"
                                        ? setLikeStatus("disliked")
                                        : setLikeStatus("none")
                                }
                            >
                                {likeStatus === "disliked" ? (
                                    <i className="bi bi-hand-thumbs-down-fill text-red-600"></i>
                                ) : (
                                    <i className="bi bi-hand-thumbs-down"></i>
                                )}
                            </span>
                            {data.dislike_count != undefined && (
                                <span className="text-[#808080] text-[14px]">
                                    {data.dislike_count}
                                </span>
                            )}
                        </div>
                        <div
                            className={`ml-[30px] mt-[-3px] relative cursor-pointer transition ${
                                isStarred ? "starred" : "not-starred"
                            }`}
                            onClick={() => setIsStarred(!isStarred)}
                        >
                            <StarIcon
                                data={{
                                    is_filled: isStarred,
                                    width: "22px",
                                    height: "22px",
                                }}
                            />
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
