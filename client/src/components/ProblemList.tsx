import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { Link } from "react-router-dom";
import { kebabToSpacedPascal } from "../ts/utils/string";
import Loading from "./Loading";
import SortIcon from "./SortIcon";

export interface ProblemListData {
    main: {
        id: number;
        name: string;
        difficulty: "hard" | "medium" | "easy" | string;
        like_count: number;
        dislike_count: number;
        status: "solved" | "none" | "attempted" | string;
        is_starred: boolean;
        acceptance_rate_count: number;
    };
}

export type Sort = "asc" | "des" | "";
export type AccaptanceSort = { acceptance_rate_count: Sort };
export type TitleSort = { title: Sort };
export type DifficultySort = { difficulty: Sort };
export type SortOptions = DifficultySort & TitleSort & AccaptanceSort;

const ProblemList = ({
    data,
    searchFn,
    searchQuery,
}: {
    data: ProblemListData[];
    searchFn: Function;
    searchQuery: string;
}) => {
    const [refReset, setRefReset] = useState<number>(0);
    const statusRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const acceptanceRef = useRef<HTMLDivElement>(null);
    const difficultyRef = useRef<HTMLDivElement>(null);
    const likesRef = useRef<HTMLDivElement>(null);
    const dislikesRef = useRef<HTMLDivElement>(null);
    const starRef = useRef<HTMLDivElement>(null);

    const [SortOptions, setSortOptions] = useState<SortOptions>({
        acceptance_rate_count: "",
        difficulty: "",
        title: "",
    });

    const statusWidth = starRef.current?.clientWidth;
    const acceptanceWidth = acceptanceRef.current?.clientWidth;
    const difficultyWidth = difficultyRef.current?.clientWidth;
    const likesWidth = likesRef.current?.clientWidth;
    const dislikesWidth = dislikesRef.current?.clientWidth;
    const starWidth = starRef.current?.clientWidth;

    const difficultyOnClick = (options: SortOptions) => {
        const { difficulty } = SortOptions;
        const newOptions: SortOptions = {
            difficulty:
                difficulty === "" ? "asc" : difficulty === "asc" ? "des" : "",
            title: SortOptions.title,
            acceptance_rate_count: SortOptions.acceptance_rate_count,
        };
        setSortOptions(newOptions);
        searchFn(searchQuery, newOptions);
    };

    const acceptanceOnClick = (options: SortOptions) => {
        const { acceptance_rate_count } = SortOptions;
        const newOptions: SortOptions = {
            acceptance_rate_count:
                acceptance_rate_count === ""
                    ? "asc"
                    : acceptance_rate_count === "asc"
                    ? "des"
                    : "",
            title: SortOptions.title,
            difficulty: SortOptions.difficulty,
        };
        setSortOptions(newOptions);
        searchFn(searchQuery, newOptions);
    };

    const titleOnClick = (options: SortOptions) => {
        const { title } = SortOptions;
        const newOptions: SortOptions = {
            title: title === "" ? "asc" : title === "asc" ? "des" : "",
            acceptance_rate_count: SortOptions.acceptance_rate_count,
            difficulty: SortOptions.difficulty,
        };
        setSortOptions(newOptions);
        searchFn(searchQuery, newOptions);
    };

    useEffect(() => {
        setRefReset(1);
    }, []);

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-row w-full text-[14px] h-[40px] items-center text-[#808080] border-b border-borders select-none">
                    <div
                        id="status-label"
                        className="h-fit w-fit px-[20px] ml-[10px]"
                        ref={statusRef}
                    >
                        Status
                    </div>
                    <div
                        id="title-label"
                        className="h-fit flex-grow px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={titleRef}
                        style={{
                            color:
                                SortOptions.title === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.title === "des"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => titleOnClick(SortOptions)}
                    >
                        Title <SortIcon order={SortOptions.title} />
                    </div>
                    <div
                        id="accaptance-label"
                        className="h-fit w-fit px-[20px] hover:text-white hover:cursor-pointer transition"
                        ref={acceptanceRef}
                        style={{
                            color:
                                SortOptions.acceptance_rate_count === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.acceptance_rate_count ===
                                      "des"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => acceptanceOnClick(SortOptions)}
                    >
                        Accaptance{" "}
                        <SortIcon order={SortOptions.acceptance_rate_count} />
                    </div>
                    <div
                        id="difficulty-label"
                        className="h-fit w-fit px-[20px] hover:cursor-pointer hover:text-white transition"
                        ref={difficultyRef}
                        style={{
                            color:
                                SortOptions.difficulty === "asc"
                                    ? "rgb(34, 197, 94)"
                                    : SortOptions.difficulty === "des"
                                    ? "rgb(220, 38, 38)"
                                    : "",
                        }}
                        onClick={() => difficultyOnClick(SortOptions)}
                    >
                        Difficulty <SortIcon order={SortOptions.difficulty} />
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
                {data != undefined &&
                data.length !== 0 &&
                statusRef.current != null ? (
                    data.map(({ main }, index) => (
                        <div
                            className={`h-[40px] w-full text-[14px] hover:text-black duration-150 ${
                                main.difficulty === "easy"
                                    ? "hover-easy-bg-color"
                                    : main.difficulty === "medium"
                                    ? "hover-medium-bg-color"
                                    : "hover-hard-bg-color"
                            } `}
                        >
                            <Link
                                to={`/problem/${main.name}`}
                                className="w-full h-[40px] flex flex-row whitespace-nowrap "
                            >
                                <div
                                    style={{
                                        width: statusWidth,
                                        height: "40px",
                                        lineHeight: "40px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    <div
                                        className={`ml-[20px]`}
                                        style={{
                                            color:
                                                main.status === "solved"
                                                    ? "#22c55e"
                                                    : main.status === "none"
                                                    ? "#808080"
                                                    : "#f97316",
                                        }}
                                    >
                                        {main.status === "solved" ? (
                                            <i
                                                className="bi bi-check-circle status-color"
                                                // style={{ color: "#22c55e" }}
                                            ></i>
                                        ) : main.status === "attempted" ? (
                                            <i
                                                className="bi bi-x-circle status-color "
                                                // style={{ color: "#f97316" }}
                                            ></i>
                                        ) : (
                                            <div className="border rounded-[99px] border-[#808080] w-[14px] h-[14px] mt-[13px] status-color"></div>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="flex-grow "
                                    style={{
                                        height: "40px",
                                        lineHeight: "40px",
                                    }}
                                >
                                    <div className="ml-[40px]">
                                        {main.id +
                                            ". " +
                                            kebabToSpacedPascal(main.name)}
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
                                        {main.acceptance_rate_count}
                                        {"%"}
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
                                            main.difficulty === "easy"
                                                ? "text-green-500"
                                                : main.difficulty === "medium"
                                                ? "text-orange-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {kebabToSpacedPascal(main.difficulty)}
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
                                        {main.like_count}
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
                                        {main.dislike_count}
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
                                        {main.is_starred ? "y" : "n"}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : data != undefined && data.length === 0 ? (
                    <div className="text-[14px] ml-[30px] text-red-600 h-[40px] leading-[40px]">
                        Problem not found
                    </div>
                ) : (
                    <Loading For="pList" />
                )}
            </div>
        </div>
    );
};

export default ProblemList;
