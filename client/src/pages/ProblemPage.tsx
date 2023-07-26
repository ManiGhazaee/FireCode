import React, { useRef } from "react";
import { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import axios from "axios";

const ProblemPage = () => {
    const [code, setCode] = useState<string>("");
    const explanationRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const handleSlider = (event: React.MouseEvent<HTMLDivElement>) => {
        const mouseX = event.clientX;
        const newWidth = mouseX - 8;
        if (explanationRef.current)
            explanationRef.current.style.width = newWidth + "px";
    };

    const submitCode = () => {
        axios
            .post("http://localhost:80/problem", { code })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    };
    return (
        <>
            <div className="h-[calc(100vh-60px)] overflow-hidden">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-slate-700 ml-[8px] rounded-lg w-[50%]"
                        ref={explanationRef}
                    ></div>
                    <div
                        id="slider"
                        className="w-[8px] h-[calc(100%-16px)] rounded-lg hover:bg-blue-800 hover:cursor-col-resize transition active:bg-blue-800 active:cursor-col-resize"
                        onDrag={handleSlider}
                        ref={sliderRef}
                    ></div>
                    <div className="flex flex-col h-[calc(100%-16px)] min-w-[calc(20%-8px)] mr-[8px] flex-grow">
                        <div className="min-h-0 flex-grow min-w-full mr-[8px] mb-[8px] rounded-lg overflow-hidden">
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
                            className="flex justify-end items-center  bg-slate-700 w-full h-[60px] rounded-lg"
                        >
                            <div className="w-fit h-fit rounded-md mr-[13px] px-[26px] py-[6px] hover:bg-green-500 cursor-pointer hover:text-black text-green-500 bg-black border-[1px] text-[14px] active:border-green-800 active:bg-green-800 border-green-500 font-bold right-0 transition select-none" onClick={submitCode}>submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemPage;
