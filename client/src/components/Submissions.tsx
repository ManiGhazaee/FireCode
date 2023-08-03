import React from "react";
import CodeBlock from "./CodeBlock";

export interface SubmissionsData {
    submissions_list: Submission[];
}
export interface Submission {
    status:
        | "Accepted"
        | "Runtime Error"
        | "Wrong Answer"
        | "Time Limit Exceeded";
    error?: string;
    runtime: number;
    memory: number;
    language: "JavaScript";
    time: Date;
    code_body: string;
    input?: string;
    expected_output?: string;
    user_output?: string;
}

const Submissions = ({ data }: { data: SubmissionsData }) => {
    console.log(data);
    const status = data.submissions_list[0].status;
    const error = data.submissions_list[0].error;
    const runtime = data.submissions_list[0].runtime;
    const memory = data.submissions_list[0].memory;
    const input = data.submissions_list[0].input;
    const expected_output = data.submissions_list[0].expected_output;
    const user_output = data.submissions_list[0].user_output;
    return (
        <div>
            <div
                className={`ml-[26px] mt-[36px] font-bold text-[22px] ${
                    status === "Accepted" ? "text-green-500" : "text-red-600"
                }`}
            >
                {status === "Accepted" ? (
                    <i
                        className="bi bi-check-circle"
                        style={{
                            color: "#22c55e",
                            marginRight: "20px",
                            width: "22px",
                            height: "22px",
                        }}
                    ></i>
                ) : (
                    <i
                        className="bi bi-x-circle"
                        style={{
                            color: "#dc2626",
                            marginRight: "20px",
                            width: "22px",
                            height: "22px",
                        }}
                    ></i>
                )}
                {(status as unknown) == undefined ? "Runtime Error" : status}
            </div>
            {error && status !== "Accepted" ? (
                <>
                    <div className="text-[14px] text-text_2 ml-[26px] mt-[20px] mb-[10px]">
                        Error Message:
                    </div>
                    <div className="ml-[26px] submission-error-block">
                        <code className="text-[14px] text-white">
                            {JSON.stringify(error)}
                        </code>
                    </div>
                </>
            ) : (
                <></>
            )}
            {status === "Accepted" && (
                <>
                    <div className="ml-[26px] mt-[20px]">
                        <span className="text-[14px] text-[#808080] mr-[10px]">
                            Runtime:
                        </span>
                        <span className="font-bold">
                            {Math.round(runtime)}
                            {"ms"}
                        </span>
                    </div>
                    <div className="ml-[26px] mt-[10px]">
                        <span className="text-[14px] text-[#808080] mr-[10px]">
                            Memory:
                        </span>
                        <span className="font-bold">
                            {Math.round(memory)}
                            {"MB"}
                        </span>
                    </div>
                </>
            )}
            <div>{/* <code>{data.submissions_list[0].code_body}</code> */}</div>
            {status === "Wrong Answer" && (
                <div className="w-full">
                    <div className="text-[14px] text-text_2 ml-[26px] my-[10px]">
                        Input:
                    </div>
                    <CodeBlock status={status} input={input || ""}></CodeBlock>
                    <div className="text-[14px] text-text_2 ml-[26px] my-[10px]">
                        Expected Output:
                    </div>
                    <CodeBlock
                        status={status}
                        input={expected_output || ""}
                    ></CodeBlock>
                    <div className="text-[14px] text-text_2 ml-[26px] my-[10px]">
                        Your Output:
                    </div>
                    <CodeBlock
                        status={status}
                        input={user_output || ""}
                    ></CodeBlock>
                </div>
            )}
        </div>
    );
};

export default Submissions;
