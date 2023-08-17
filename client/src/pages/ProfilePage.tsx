import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import { API_URL } from "../App";

const ProfilePage = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [user, setUser] = useState<PublicUser>();
    const [verifiedCertain, setVerifiedCertain] = useState<boolean>(false);
    const { name } = useParams();

    const [eAll, setEAll] = useState<number>();
    const [mAll, setMAll] = useState<number>();
    const [hAll, setHALL] = useState<number>();

    const [eSolved, setESolved] = useState<number>();
    const [mSolved, setMSolved] = useState<number>();
    const [hSolved, setHSolved] = useState<number>();

    useEffect(() => {
        axios
            .get(`${API_URL}/api/accounts/id/${id}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(({ data }) => {
                setUsername(data.username);
                setVerified(true);
                setVerifiedCertain(true);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                setVerified(false);
                setVerifiedCertain(true);
            });
        axios
            .get<{}, { data: PublicUser }>(`${API_URL}/api/accounts/${name}`)
            .then(({ data }) => {
                setUsername(data.username);
                setUser(data);
                setEAll(data.easy_problems_count);
                setMAll(data.medium_problems_count);
                setHALL(data.hard_problems_count);
                setESolved(data.problems_solved_easy);
                setMSolved(data.problems_solved_medium);
                setHSolved(data.problems_solved_hard);
            })
            .catch((e: AxiosError) => {
                console.log(e);
            });
    }, []);
    return (
        <div>
            {verifiedCertain && verified ? (
                <MainHeading
                    data={{
                        username: username,
                        status: "loggedin",
                        items: [
                            { text: "Problem List", link_path: "/problemset" },
                        ],
                    }}
                />
            ) : verifiedCertain === true && verified === false ? (
                <MainHeading
                    data={{
                        status: "not-loggedin",
                    }}
                />
            ) : (
                <MainHeading
                    data={{
                        status: "none",
                    }}
                />
            )}
            {user != null ? (
                <>
                    <div className="w-[calc(100%-72px)] h-[260px] sm:h-[160px] bg-black mx-auto mt-[8px] rounded-lg border border-borders">
                        <div
                            id="main"
                            className="flex flex-col sm:flex-row h-fit"
                        >
                            <div id="porfile-pic">
                                <div className="w-[80px] h-[80px] mt-[40px] border border-borders sm:ml-[50px] mx-auto rounded-lg"></div>
                            </div>
                            <div className="flex flex-col w-[280px] text-center sm:text-left mx-auto sm:ml-0">
                                <div
                                    id="username"
                                    className="text-[28px] font-bold mt-[20px] sm:mt-[40px] text-white sm:ml-[30px] ml-0"
                                >
                                    {user.username}
                                </div>
                                <div
                                    id="username"
                                    className="text-[18px] mt-[6px] text-text_2 sm:ml-[30px] ml-0"
                                >
                                    Rank: {user.rank}
                                </div>
                            </div>
                            <div className="md:flex hidden flex-row absolute right-[90px]">
                                <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px] rounded-lg relative">
                                    <i className="bi bi-x-lg text-borders absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></i>
                                </div>
                                <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px] rounded-lg relative">
                                    <i className="bi bi-x-lg text-borders absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></i>
                                </div>
                                <div className="w-[80px] h-[80px] mt-[40px] border border-borders ml-[20px] rounded-lg relative">
                                    <i className="bi bi-x-lg text-borders absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:flex-row sm:flex-col flex-col w-[calc(100%-72px)] mx-auto justify-between">
                        <div className="lg:w-[calc(40%-4px)] sm:w-full h-[240px] bg-black mt-[8px] rounded-lg border border-borders">
                            <div className="text-[22px] font-bold mt-[40px] text-white ml-[50px]">
                                Community Stats
                            </div>
                            <div className="mt-[18px] text-[14px] ml-[50px]">
                                <span className="text-text_2">Views:</span>{" "}
                                {user.views}
                            </div>
                            <div className="mt-[18px] text-[14px] ml-[50px]">
                                <span className="text-text_2">Solutions:</span>{" "}
                                {user.solution_count}
                            </div>
                            <div className="mt-[18px] text-[14px] ml-[50px] mb-[40px]">
                                <span className="text-text_2">Reputation:</span>{" "}
                                {user.reputation_count}
                            </div>
                        </div>
                        <div className="lg:w-[calc(60%-4px)] sm:w-full sm:h-[240px] h-[450px] bg-black mt-[8px] rounded-lg border border-borders relative">
                            <div className="flex sm:flex-row flex-col justify-between">
                                <div>
                                    <div className="text-[22px] font-bold mt-[40px] text-white ml-[50px]">
                                        Solved Problems
                                    </div>
                                    <div className="text-[72px] font-bold mt-[32px] text-white ml-[50px]">
                                        {user.problems_solved_count}{" "}
                                        <span className="text-text_2 text-[14px]">
                                            {"/ "}
                                            {user.easy_problems_count +
                                                user.medium_problems_count +
                                                user.hard_problems_count}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col relative mr-[50px] mt-[40px] w-[200px] sm:w-[280px] ml-[50px] sm:ml-0">
                                    <div className="text-[14px] relative">
                                        <div className="flex flex-row justify-between">
                                            <div className="mb-[8px] text-green-500">
                                                Easy
                                            </div>
                                            <div className="mb-[8px] text-green-500">
                                                {eSolved}
                                                {" / "}
                                                {eAll}
                                            </div>
                                        </div>
                                        <div
                                            className={`sm:w-[280px] w-[200px] h-[8px] bg-borders mb-[16px] relative after:absolute easy-line after:h-[8px] after:rounded rounded  after:bg-green-500`}
                                        ></div>
                                    </div>
                                    <div className="text-[14px] relative">
                                        <div className="flex flex-row justify-between">
                                            <div className="mb-[8px] text-orange-500">
                                                Medium
                                            </div>
                                            <div className="mb-[8px] text-orange-500">
                                                {mSolved}
                                                {" / "}
                                                {mAll}
                                            </div>
                                        </div>
                                        <div
                                            className={`sm:w-[280px] w-[200px] h-[8px] bg-borders mb-[16px] relative after:absolute medium-line after:h-[8px] after:rounded rounded after:bg-orange-500`}
                                        ></div>
                                    </div>
                                    <div className="text-[14px] relative">
                                        <div className="flex flex-row justify-between">
                                            <div className="mb-[8px] text-red-600">
                                                Hard
                                            </div>
                                            <div className="mb-[8px] text-red-600">
                                                {hSolved}
                                                {" / "}
                                                {hAll}
                                            </div>
                                        </div>
                                        <div
                                            className={`sm:w-[280px] w-[200px] h-[8px] bg-borders mb-[16px] relative after:absolute hard-line after:h-[8px] after:rounded rounded after:bg-red-500`}
                                        ></div>
                                        <style>
                                            {`.easy-line::after { width: ${
                                                ((eSolved || 0) / (eAll || 1)) *
                                                100
                                            }%; }`}
                                            {`.medium-line::after { width: ${
                                                ((mSolved || 0) / (mAll || 1)) *
                                                100
                                            }%; }`}
                                            {`.hard-line::after { width: ${
                                                ((hSolved || 0) / (hAll || 1)) *
                                                100
                                            }%; }`}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProfilePage;
