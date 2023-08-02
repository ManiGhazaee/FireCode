import React, { SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import axios from "axios";
import ProblemNavbar from "../components/ProblemNavbar";
import ProblemDescription from "../components/ProblemDescription";
import { useNavigate, useParams } from "react-router-dom";
import Editorial from "../components/Editorial";
import MainHeading from "../components/MainHeading";
import Submissions, { Submission } from "../components/Submissions";

type ProblemData = CodeData & DescriptionData;

export interface CodeData {
    code_default_language: string;
    code_body: Record<string, string>;
    testcases?: TestCase[];
}

export interface DescriptionData {
    id: number;
    name: string;
    difficulty: "hard" | "medium" | "easy" | string;
    like_count: number;
    dislike_count: number;
    status: "solved" | "none" | "attempted" | string;
    is_starred: boolean;
    like_status: "liked" | "disliked" | "none" | string;
    description_body: string;
    accept_count: number;
    submission_count: number;
    acceptance_rate_count: number;
    discussion_count: number;
    related_topics: string[];
    similar_questions: string[];
    solution_count: number;
}

export interface EditorialData {
    editorial_body: string;
}

export interface Json {
    main: ProblemData;
    editorial: EditorialData;
}

export interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
}

export interface ProblemPageData {
    activeNavOption?: string | undefined;
}

const ProblemPage = ({ data }: { data?: ProblemPageData }) => {
    const [code, setCode] = useState<string>("");
    const explanationRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentLang, setCurrentLang] = useState<string>("javascript");
    const handleSlider = (event: React.MouseEvent<HTMLDivElement>) => {
        const mouseX = event.clientX;
        const newWidth = mouseX - 8;
        if (explanationRef.current)
            explanationRef.current.style.width = newWidth + "px";
    };

    const [editorial, setEditorial] = useState<string>("");

    const activeNavOption = data?.activeNavOption || "description";

    const [problemDescriptionData, setProblemDescriptionData] =
        useState<DescriptionData>();

    const [submissionData, setSubmissionData] = useState<Submission>();
    const navigate = useNavigate();

    const { name } = useParams();

    const submitCode = () => {
        axios
            .post("http://localhost:80/problem", { code })
            .then(({ data }) => {
                console.log(data);
                setSubmissionData(data as unknown as Submission);
                navigate(`/problem/${name}/submissions`);
            })
            .catch((err) => console.error(err));
    };
    console.log(submissionData);

    useEffect(() => {
        axios
            .get(`http://localhost:80/problem/${name}`)
            .then(({ data }) => {
                setProblemDescriptionData(
                    data as unknown as SetStateAction<
                        DescriptionData | undefined
                    >
                );
                if ("code_body" in data && "javascript" in data.code_body) {
                    setCode(data.code_body.javascript as unknown as string);
                }
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (activeNavOption === "description") return;

        axios
            .get(`http://localhost:80/problem/${name}/${activeNavOption}`)
            .then(({ data }) => {
                if (activeNavOption === "editorial") {
                    if ("editorial_body" in data) {
                        setEditorial(data.editorial_body);
                    }
                }
            })
            .catch((e) => console.error(e));
    }, [activeNavOption]);

    return (
        <>
            <MainHeading
                data={{
                    items: [{ text: "ProblemList", link_path: "/problemset" }],
                }}
            />
            <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-black border border-[#222] ml-[8px] rounded-lg w-[50%] overflow-hidden"
                        ref={explanationRef}
                    >
                        <div className="relative w-full bg-black h-[50px] rounded-t-lg overflow-hidden border-b border-[#222]">
                            {name != undefined && (
                                <ProblemNavbar
                                    data={{
                                        problem_name: name,
                                        nav_option_name: activeNavOption,
                                    }}
                                />
                            )}
                        </div>
                        <div className="description-body relative w-full h-[calc(100%-50px)] overflow-y-auto bg-black">
                            {problemDescriptionData != undefined &&
                            activeNavOption === "description" ? (
                                <ProblemDescription
                                    data={problemDescriptionData}
                                />
                            ) : (
                                <></>
                            )}
                            {activeNavOption === "editorial" && (
                                <Editorial data={editorial} />
                            )}
                            {activeNavOption === "submissions" &&
                                submissionData != undefined && (
                                    <Submissions
                                        data={{
                                            submissions_list: [submissionData],
                                        }}
                                    />
                                )}
                        </div>
                    </div>
                    <div
                        id="slider"
                        className="w-[8px] h-[calc(100%-16px)] rounded-lg hover:bg-blue-800 hover:cursor-col-resize transition active:bg-blue-800 active:cursor-col-resize"
                        onDrag={handleSlider}
                        ref={sliderRef}
                        draggable="true"
                    ></div>
                    <div className="flex flex-col h-[calc(100%-16px)] min-w-[calc(20%-8px)] mr-[8px] flex-grow">
                        <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden bg-black border border-[#222]">
                            <div className="h-[50px] bg-black relative border-b border-[#222]">
                                <div
                                    className=" inline-block relative w-fit h-fit rounded-md ml-[13px] top-[8px] px-[6px] py-[6px] text-gray-300 hover:text-white cursor-pointer text-[14px] font-bold transition select-none"
                                    onClick={submitCode}
                                >
                                    {currentLang}
                                </div>
                            </div>
                            <ReactCodeMirror
                                value={code}
                                extensions={[loadLanguage("javascript")!]}
                                theme={tokyoNight}
                                onChange={(value) => {
                                    setCode(value);
                                }}
                                width="100%"
                                height="100%"
                            />
                        </div>
                        <div
                            id="console"
                            className="flex justify-end items-center bg-black w-full h-[50px] rounded-lg overflow-hidden border border-[#222]"
                        >
                            <div
                                className="w-fit h-fit rounded mr-[11px] px-[20px] py-[4px] hover:bg-white cursor-pointer hover:text-black hover:border-white text-[#808080] bg-black text-[14px] active:border-[#808080] active:bg-[#808080] border-[#222] font-bold right-0 transition select-none"
                                // onClick={runCode}
                            >
                                Run
                            </div>
                            <div
                                className="w-fit h-fit rounded mr-[11px] px-[20px] py-[4px] hover:bg-green-500 cursor-pointer hover:text-black text-green-500 bg-black text-[14px] active:border-green-800 active:bg-green-800 border-green-500 font-bold right-0 transition select-none"
                                onClick={submitCode}
                            >
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemPage;
