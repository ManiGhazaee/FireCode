import React, { useState } from "react";
import CustomNavbar, { Navbar } from "../components/CustomNavbar";
import ProblemList from "../components/ProblemList";
import { changeCase } from "../ts/utils/string";
import MainHeading from "../components/MainHeading";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const ProblemSet = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const navigate = useNavigate();
    const [problemListData, setProblemListData] = useState();
    const customNavData: Navbar = {
        items: [
            { text: "All Topics", link_path: "/problemset" },
            { text: "Algorithms", link_path: "/problemset" },
            { text: "JavaScript", link_path: "/problemset" },
            { text: "DataBase", link_path: "/problemset" },
            { text: "Shell", link_path: "/problemset" },
        ],
    };

    useEffect(() => {
        axios
            .get(`http://localhost:80/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                if (
                    (e.response?.data as { success: boolean; message: string })
                        .success === false
                ) {
                    navigate("/sorry");
                    setVerified(false);
                }
            });

        axios
            .post("http://localhost:80/api/problem/all", { id: id })
            .then(({ data }) => {
                setProblemListData(data);
                console.log(data);
            });
    }, []);

    return (
        <>
            {verified && (
                <>
                    <MainHeading data={{ username: username || "" }} />
                    <div className="h-[calc(100vh-60px)] overflow-hidden bg-black">
                        <div
                            id="cont"
                            className="relative flex flex-row h-[calc(100vh-60px)] w-full mt-[8px] "
                        >
                            <div
                                id="explanation"
                                className="h-[calc(100%-16px)] bg-black border border-borders ml-[8px] rounded-lg w-[calc(100%-16px)] overflow-hidden"
                            >
                                <div className="w-full bg-black border-b border-borders ">
                                    <div className="ml-[9px]">
                                        <CustomNavbar data={customNavData} />
                                    </div>
                                </div>
                                <div>
                                    <ProblemList
                                        data={problemListData as any}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProblemSet;
