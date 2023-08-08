import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import SidePanel from "./SidePanel";

export interface MainHeadingData {
    items?: MainHeadingItems[];
    username?: string;
    id?: string;
    status?: "loggedin" | "not-loggedin" | "none";
}

export interface MainHeadingItems {
    text: string;
    link_path: string;
}

const MainHeading = ({ data }: { data?: MainHeadingData }) => {
    const [sidePanelState, setSidePanelState] = useState<boolean>(false);

    return (
        <>
            <div className="fixed w-full h-[60px] bg-black border-b border-borders flex felx-row z-[100]">
                <Link to="/">
                    <div
                        id="logo-cont"
                        className="inline-block text-[24px] font-bold italic mx-[36px] mt-[12px]"
                    >
                        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 px-[1px]">
                            Fire
                        </span>
                        <span>Code</span>
                    </div>
                </Link>
                {data != undefined &&
                    "items" in data &&
                    data.items != undefined &&
                    data.items.length !== 0 &&
                    data.items.map((elem) => (
                        <Link
                            to={elem.link_path}
                            className="mt-[15px] text-[14px] h-fit p-[5px] text-[#808080] hover:text-white transition"
                        >
                            <div id={elem.text}>{elem.text}</div>
                        </Link>
                    ))}
                {data?.status === "loggedin" || data?.status == undefined ? (
                    <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                        <div
                            id="notification"
                            className="inline-block p-[5px] text-[14px] text-[#808080] "
                        >
                            <div className="group w-[32px] h-[32px] border border-borders rounded-[99px] relative hover:bg-[#222] cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-bell absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                                </svg>
                            </div>
                        </div>
                        <div
                            id="profile-picture"
                            className="inline-block relative p-[5px] text-[14px] text-[#808080] "
                            onClick={() => setSidePanelState(!sidePanelState)}
                        >
                            <Tooltip text={data?.username || ""}>
                                <div className="w-[32px] h-[32px] border border-borders rounded-[99px]"></div>
                            </Tooltip>
                        </div>
                        <SidePanel
                            displayFn={setSidePanelState}
                            display={sidePanelState}
                            data={{
                                username: data?.username || "",
                            }}
                        />
                    </div>
                ) : data?.status === "not-loggedin" ? (
                    <div className="fixed flex flex-row right-[36px] items-center h-[60px]">
                        <Link
                            to="/login"
                            className="inline-block font-bold py-[6px] px-[16px] bg-black hover:bg-borders border rounded-md border-borders text-white text-[14px]"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="ml-[8px] font-bold inline-block py-[6px] px-[16px] bg-gradient-to-r from-orange-500 to-red-600 border rounded-md border-borders text-black text-[14px] hover:bg-red-800"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="h-[60px]"></div>
        </>
    );
};

export default MainHeading;
