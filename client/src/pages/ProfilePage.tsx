import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = ({
    token,
    id,
}: {
    token: string | null;
    id: string | null;
}) => {
    const [username, setUsername] = useState<string>("");
    const [verified, setVerified] = useState<boolean>(false);
    const [user, setUser] = useState<object>();
    const [verifiedCertain, setVerifiedCertain] = useState<boolean>(false);
    const { name } = useParams();

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
                setVerifiedCertain(true);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                if (
                    (e.response?.data as { success: boolean; message: string })
                        .success === false
                ) {
                    setVerified(false);
                    setVerifiedCertain(true);
                }
            });
        axios
            .get(`http://localhost:80/api/accounts/${name}`)
            .then(({ data }) => {
                setUsername(data.username);
                setUser(data);
                console.log(data);
            })
            .catch((e: AxiosError) => {
                console.log(e);
            });
    }, []);
    return <div>{JSON.stringify(user)}</div>;
};

export default ProfilePage;
