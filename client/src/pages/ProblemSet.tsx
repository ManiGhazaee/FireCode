import { useState } from "react";
import CustomNavbar from "../components/CustomNavbar";
import ProblemList from "../components/ProblemList";
import MainHeading from "../components/MainHeading";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";

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

    const [searchQ, setSearchQ] = useState<string>("");

    const handleSearch = async (
        searchQuery: string,
        options: SortOptions = {
            acceptance_rate_count: "",
            difficulty: "",
            title: "",
        }
    ) => {
        const { acceptance_rate_count, difficulty, title } = options;
        try {
            const { data } = await axios.post(
                `${API_URL}/api/problem/all?search=${searchQuery}&acceptance=${acceptance_rate_count}&difficulty=${difficulty}&title=${title}`,
                { id }
            );
            setProblemListData(data);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

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
            })
            .catch((e: AxiosError) => {
                console.log(e);
                navigate("/sorry");
                setVerified(false);
            });

        axios
            .post(`${API_URL}/api/problem/all`, { id: id })
            .then(({ data }) => {
                setProblemListData(data);
            });
    }, []);

    return (
        <>
            {verified ? (
                <MainHeading data={{ username: username }} />
            ) : (
                <MainHeading data={{ status: "none" }} />
            )}

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
                        <div className="w-full bg-black h-[40px] relative border-b border-borders">
                            <input
                                type="text"
                                placeholder="Search questions..."
                                onChange={(e) => {
                                    handleSearch(e.target.value);
                                    setSearchQ(e.target.value);
                                }}
                                className="bg-black outline-none border-none relative -translate-y-1/2 top-1/2 left-[9px] px-[20px] text-[14px] h-[calc(100%-2px)] placeholder:text-[14px] placeholder:text-text_2 w-[calc(100%-100px)]"
                            />
                        </div>
                        <div>
                            <ProblemList
                                searchFn={handleSearch}
                                searchQuery={searchQ}
                                data={problemListData as any}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProblemSet;
