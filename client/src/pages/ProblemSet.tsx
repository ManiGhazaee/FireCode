import React from "react";

const ProblemSet = () => {
    return (
        <>
            <div className="h-[calc(100vh-60px)] overflow-hidden">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-slate-700 ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    ></div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
