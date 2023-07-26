import React from "react";

const MainHeading = () => {
    return (
        <>
            <div className="fixed w-full h-[60px] bg-gray-800 flex felx-row z-[100]">
                <div
                    id="logo-cont"
                    className="inline-block  mx-[20px] mt-[16px]"
                >
                    cheat-code
                </div>
                <div
                    id="problems"
                    className="inline-block  mx-[20px] mt-[16px]"
                >
                    problems
                </div>
                <div
                    id="notification "
                    className="fixed inline-block mx-[20px] mt-[16px] right-[60px]"
                >
                    notif
                </div>
                <div
                    id="profile-pic"
                    className="fixed inline-block mx-[20px] mt-[16px] right-[20px] " 
                >
                    prof
                </div>
            </div>
            <div className="h-[60px]"></div>
        </>
    );
};

export default MainHeading;
