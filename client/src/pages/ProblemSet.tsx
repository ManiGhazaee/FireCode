import React from "react";
import CustomNavbar, { Navbar } from "../components/CustomNavbar";

const ProblemSet = () => {
    const customNavData: Navbar = {
        items: [
            { text: "All Topics", link_path: "/problemset" },
            { text: "Algorithms", link_path: "/problemset" },
            { text: "JavaScript", link_path: "/problemset" },
            { text: "DataBase", link_path: "/problemset" },
            { text: "Shell", link_path: "/problemset" },
        ],
        default_active_item: "none",
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
                        className="h-[calc(100%-16px)] bg-slate-700 ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    >
                        
                        <div className="w-full bg-black">
                            <CustomNavbar data={customNavData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
