import React, { useState } from "react";

const SidePanel = ({ display }: { display: boolean }) => {
    const [displayState, setdisplayState] = useState<boolean>(display);

    return (
        <div
            className={` fixed ${
                displayState ? "translate-x-[-100%]" : " translate-x-[0]"
            } left-full bg-white h-screen w-[250px]`}
        ></div>
    );
};

export default SidePanel;
