import React from "react";

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
}

const Submissions = ({ data }: { data: SubmissionsData }) => {
    console.log(data);
    return (
        <div>
            <div
                className={`ml-[26px] mt-[36px] font-bold text-[22px] ${
                    data.submissions_list[0].status === "Accepted"
                        ? "text-green-500"
                        : "text-red-600"
                }`}
            >
                {data.submissions_list[0].status === "Accepted" ? (
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
                {(data.submissions_list[0].status as unknown) == undefined
                    ? "Runtime Error"
                    : data.submissions_list[0].status}
            </div>
            {data.submissions_list[0].error &&
            data.submissions_list[0].status !== "Accepted" ? (
                <div className="ml-[26px] mt-[20px]">
                    <code>
                        {JSON.stringify(data.submissions_list[0].error)}
                    </code>
                </div>
            ) : (
                <></>
            )}
            <div className="ml-[26px] mt-[20px]">
                <span className="text-[14px] text-[#808080] mr-[10px]">
                    Runtime:
                </span>
                <span className="font-bold">
                    {Math.round(data.submissions_list[0].runtime)}
                    {"ms"}
                </span>
            </div>
            <div className="ml-[26px] mt-[10px]">
                <span className="text-[14px] text-[#808080] mr-[10px]">
                    Memory:
                </span>
                <span className="font-bold">
                    {Math.round(data.submissions_list[0].memory)}
                    {"MB"}
                </span>
            </div>
            <div>{/* <code>{data.submissions_list[0].code_body}</code> */}</div>
        </div>
    );
};

export default Submissions;
