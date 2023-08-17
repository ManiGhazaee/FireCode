import React, { CSSProperties } from "react";

const Tooltip = ({
    text,
    children,
    style,
}: {
    text: string;
    children: React.ReactNode;
    style?: CSSProperties;
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    if (text === "") return <>{children}</>;

    return (
        <>
            <div
                className="hover:cursor-pointer h-fit w-fit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </div>
            {isHovered && style == undefined ? (
                <div className="select-none absolute mt-[4px] left-1/2 -translate-x-1/2 bg-black border border-borders text-white px-[8px] py-[4px] rounded text-[14px]">
                    {text}
                </div>
            ) : isHovered ? (
                <div className="select-none absolute transition" style={style}>
                    {text}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Tooltip;
