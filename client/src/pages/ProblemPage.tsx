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
        console.log(sliderRef.current?.offsetLeft);
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
            <div id="cont" className="relative flex flex-row h-screen w-full">
                <div id="explanation" className="w-full" ref={explanationRef}>
                    <div
                        id="slider"
                        className="relative left-full translate-x-[-100%] w-2 bg-slate-300 h-full"
                        onMouseDown={(event) => handleSlider(event)}
                        ref={sliderRef}
                    ></div>
                </div>
                <div className="h-full min-w-[500px]">
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
            </div>
            <div onClick={submitCode}>submit</div>
        </>
    );
};

export default ProblemPage;
