import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { kebabToSpacedPascal } from "../ts/utils/string";

export interface ProblemListData {
    id: number;
    name: string;
    difficulty: "hard" | "medium" | "easy" | string;
    like_count: number;
    dislike_count: number;
    status: "solved" | "none" | "attempted" | string;
    is_starred: boolean;
    acceptance_rate_count: number;
}

const ProblemList = ({ data }: { data: ProblemListData[] }) => {
    const [refReset, setRefReset] = useState<number>(0);
    const statusRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const acceptanceRef = useRef<HTMLDivElement>(null);
    const difficultyRef = useRef<HTMLDivElement>(null);
    const likesRef = useRef<HTMLDivElement>(null);
    const dislikesRef = useRef<HTMLDivElement>(null);
    const starRef = useRef<HTMLDivElement>(null);

    const statusWidth = starRef.current?.clientWidth;
    const titleWidth = titleRef.current?.clientWidth;
    const acceptanceWidth = acceptanceRef.current?.clientWidth;
    const difficultyWidth = difficultyRef.current?.clientWidth;
    const likesWidth = likesRef.current?.clientWidth;
    const dislikesWidth = dislikesRef.current?.clientWidth;
    const starWidth = starRef.current?.clientWidth;

    useEffect(() => {
        setRefReset(1);
    }, []);

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row w-full text-[14px] h-[40px] items-center text-[#808080]">
                    <div
                        id="status-label"
                        className="h-fit w-fit px-[20px] ml-[10px]"
                        ref={statusRef}
                    >
                        Status
                    </div>
                    <div
                        id="title-label"
                        className="h-fit flex-grow px-[20px]"
                        ref={titleRef}
                    >
                        Title
                    </div>
                    <div
                        id="accaptance-label"
                        className="h-fit w-fit px-[20px]"
                        ref={acceptanceRef}
                    >
                        Accaptance
                    </div>
                    <div
                        id="difficulty-label"
                        className="h-fit w-fit px-[20px]"
                        ref={difficultyRef}
                    >
                        Difficulty
                    </div>
                    <div
                        id="likes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={likesRef}
                    >
                        Likes
                    </div>
                    <div
                        id="dislikes-label"
                        className="h-fit w-fit px-[20px]"
                        ref={dislikesRef}
                    >
                        Dislikes
                    </div>
                    <div
                        id="star-label"
                        className="h-fit w-fit px-[20px]"
                        ref={starRef}
                    >
                        Star
                    </div>
                </div>
                {data.length !== 0 &&
                    statusRef.current != null &&
                    data.map((elem, index) => (
                        <div
                            className={`h-[40px] w-full text-[14px] hover:text-black duration-150 ${
                                elem.difficulty === "easy"
                                    ? "hover-easy-bg-color"
                                    : elem.difficulty === "medium"
                                    ? "hover-medium-bg-color"
                                    : "hover-hard-bg-color"
                            } `}
                        >
                            <Link
                                to={`/problem/${elem.name}`}
                                className="w-full h-[40px] flex flex-row whitespace-nowrap"
                            >
                                <div
                                    style={{
                                        width: statusWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.status}
                                    </div>
                                </div>
                                <div
                                    className="flex-grow"
                                    style={{
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.id +
                                            ". " +
                                            kebabToSpacedPascal(elem.name)}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: acceptanceWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.acceptance_rate_count}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: difficultyWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div
                                        className={`ml-[20px] difficulty-text duration-150 ${
                                            elem.difficulty === "easy"
                                                ? "text-green-500"
                                                : elem.difficulty === "medium"
                                                ? "text-orange-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {kebabToSpacedPascal(elem.difficulty)}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: likesWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.like_count}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: dislikesWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.dislike_count}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        width: starWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[20px]">
                                        {elem.is_starred ? "y" : "n"}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                <style>
                    {`.hover-easy-bg-color:hover { background-color: #22c55e}`}
                    {`.hover-medium-bg-color:hover { background-color: #f97316}`}
                    {`.hover-hard-bg-color:hover { background-color: #dc2626}`}
                    {`.hover-easy-bg-color:hover .difficulty-text { color: black}`}
                    {`.hover-medium-bg-color:hover .difficulty-text { color: black}`}
                    {`.hover-hard-bg-color:hover .difficulty-text { color: black}`}
                </style>
            </div>
        </div>
    );
};

export default ProblemList;
