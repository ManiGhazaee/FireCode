import React from "react";
import CustomNavbar, { Navbar } from "../components/CustomNavbar";
import ProblemList from "../components/ProblemList";
import { changeCase } from "../ts/utils/string";
import MainHeading from "../components/MainHeading";

const ProblemSet = () => {
    const customNavData: Navbar = {
        items: [
            { text: "All Topics", link_path: "/problemset" },
            { text: "Algorithms", link_path: "/problemset" },
            { text: "JavaScript", link_path: "/problemset" },
            { text: "DataBase", link_path: "/problemset" },
            { text: "Shell", link_path: "/problemset" },
        ],
    };
    const problemListData = [
        {
            id: 1,
            name: "two-sum",
            difficulty: "easy",
            like_count: 200,
            dislike_count: 23,
            status: "none",
            is_starred: false,
            acceptance_rate_count: 50.3,
        },
        {
            id: 2,
            name: "add-two-numbers",
            difficulty: "medium",
            like_count: 400,
            dislike_count: 600,
            status: "none",
            is_starred: true,
            acceptance_rate_count: 42.9,
        },
    ];
    return (
        <>
            <MainHeading />
            <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
                <div
                    id="cont"
                    className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                >
                    <div
                        id="explanation"
                        className="h-[calc(100%-16px)] bg-black border border-[#222] ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                    >
                        <div className="w-full bg-black border-b border-[#222]">
                            <CustomNavbar data={customNavData} />
                        </div>
                        <div>
                            <ProblemList data={problemListData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
