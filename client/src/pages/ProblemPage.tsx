import React, { SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import axios from "axios";
import ProblemNavbar from "../components/ProblemNavbar";
import ProblemDescription from "../components/ProblemDescription";
import { useLocation, useParams } from "react-router-dom";
import { DescriptionData } from "../components/ProblemDescription";
import { getProblem } from "../constants/problems/problemToJSON";
import { stringify } from "querystring";
import path from "path";
import Editorial from "../components/Editorial";

export interface Data {
    id: number;
    name: number;
    difficulty: "hard" | "medium" | "easy" | string;
    like_count: number;
    dislike_count: number;
    is_solved: boolean;
    is_starred: boolean;
    description_body: string;
    accept_count: number;
    submission_count: number;
    acceptance_rate_count: number;
    discussion_count: number;
    related_topics: string[];
    similar_questions: string[];
    solution_count: number;

    code_default_language: string;
    code_body: Record<string, string>;
    testcases: TestCase[];
}

export interface TestCase {
    inputs: Record<string, string>;
    expected_output_name: string;
    expected_output: string;
}

const ProblemPage = () => {
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

    const [activeNavOption, setActiveNavOption] =
        useState<string>("description");

    const changeActiveNavOptionOnClick = (string: string) => {
        setActiveNavOption(string);
    };

    const [problemDescriptionData, setProblemDescriptionData] =
        useState<DescriptionData>();

    const { name } = useParams();
    const pathSplited = useLocation().pathname.split("/");
    const path = pathSplited[pathSplited.length - 1];

    const submitCode = () => {
        axios
            .post("http://localhost:80/problem", { code })
            .then(({ data }) => {
            })
            .catch((err) => console.error(err));
    };

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
            <div className="h-[calc(100vh-60px)] overflow-hidden">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-slate-700 ml-[8px] rounded-lg w-[50%] overflow-hidden"
                        ref={explanationRef}
                    >
                        <div className="relative w-full bg-slate-800 h-[50px] rounded-t-lg overflow-hidden">
                            {name != undefined && (
                                <ProblemNavbar
                                    onOptionClick={changeActiveNavOptionOnClick}
                                    data={{
                                        problem_name: name,
                                        nav_option_name: path,
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
                        <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden">
                            <div className="h-[50px] bg-slate-700 relative">
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
                            className="flex justify-end items-center  bg-slate-700 w-full h-[50px] rounded-lg overflow-hidden"
                        >
                            <div
                                className="w-fit h-fit rounded-md mr-[11px] px-[22px] py-[4px] hover:bg-gray-500 cursor-pointer hover:text-black text-gray-500 bg-black border-[1px] text-[14px] active:border-gray-600 active:bg-gray-600 border-gray-500 font-bold right-0 transition select-none"
                                // onClick={runCode}
                            >
                                run
                            </div>
                            <div
                                className="w-fit h-fit rounded-md mr-[11px] px-[22px] py-[4px] hover:bg-green-500 cursor-pointer hover:text-black text-green-500 bg-black border-[1px] text-[14px] active:border-green-800 active:bg-green-800 border-green-500 font-bold right-0 transition select-none"
                                onClick={submitCode}
                            >
                                submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemPage;
