import CodeBlock from "./CodeBlock";

const Submissions = ({ data }: { data: SubmissionsData }) => {
    if (!data || data.submissions_list.length === 0)
        return (
            <div className="text-[14px] text-text_2 mx-auto text-center mt-[50px]">
                No submissions found
            </div>
        );
    const status = data.submissions_list[0].status;
    const error = data.submissions_list[0].error;
    const runtime = data.submissions_list[0].runtime;
    const memory = data.submissions_list[0].memory;
    const input = data.submissions_list[0].input;
    const expected_output = data.submissions_list[0].expected_output;
    const user_output = data.submissions_list[0].user_output;

    return (
        <div>
            {data.is_submitted ? (
                <>
                    <div
                        className={`ml-[26px] mt-[36px] font-bold text-[22px] ${
                            status === "Accepted"
                                ? "text-green-500"
                                : "text-red-600"
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
                        {(status as unknown) == undefined
                            ? "Runtime Error"
                            : status}
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
                            <div className="ml-[26px] mt-[10px] mb-[20px]">
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
                    {status === "Wrong Answer" && (
                        <div className="w-full">
                            <div className="text-[14px] text-text_2 ml-[26px] my-[10px]">
                                Input:
                            </div>
                            <CodeBlock
                                status={status}
                                input={input || ""}
                            ></CodeBlock>
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
                </>
            ) : (
                <></>
            )}
            {data.submissions_list != undefined &&
                data.submissions_list.length !== 0 && (
                    <>
                        <div className="flex flex-row text-[14px] text-text_2 items-center py-[10px] w-[calc(100%-52px)] ml-[26px]">
                            <div className="w-[196px]">Status</div>
                            <div className="w-[100px]">Language</div>
                            <div className="w-[80px]">Runtime</div>
                            <div className="w-[80px]">Memory</div>
                            <div className="w-[120px]">Date</div>
                        </div>
                    </>
                )}
            {data.submissions_list != undefined &&
                data.submissions_list.length !== 0 &&
                data.submissions_list.map((elem) => (
                    <div className="flex flex-row mb-[8px] text-[14px] px-[16px] py-[10px] ml-[26px] w-[calc(100%-52px)] bg-[#252525] rounded-[4px] overflow-hidden whitespace-nowrap">
                        <div
                            className={`font-bold w-[180px] ${
                                elem.status === "Accepted"
                                    ? "text-green-500"
                                    : "text-red-600"
                            }`}
                        >
                            {elem.status}
                        </div>
                        <div className="w-[100px]">{elem.language}</div>
                        <div className="w-[80px]">
                            {Math.round(elem.runtime)}
                            {"ms"}
                        </div>
                        <div className="w-[80px]">
                            {Math.round(elem.memory)}
                            {"MB"}
                        </div>
                        <div className="w-[120px]">
                            {new Date(elem.time).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Submissions;
