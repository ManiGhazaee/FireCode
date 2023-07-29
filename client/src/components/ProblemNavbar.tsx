import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export interface Navbar {
    text: string;
    color?: string | undefined;
    background_color?: string | undefined;
    onclick_function: Function;
}

type OnOptionClick = (string: string) => void;
type Data = { problem_name: string; nav_option_name: string };

const ProblemNavbar = ({
    onOptionClick,
    data,
}: {
    onOptionClick: OnOptionClick;
    data: Data;
}) => {
    const [currentWidth, setCurrentWidth] = useState<string>("");
    const [isInMenu, setIsInMenu] = useState<boolean>(false);
    const [prevIsInMenu, setPrevIsInMenu] = useState<boolean>(false);
    const [translateX, setTranslateX] = useState<number>(0);

    const [activeItem, setActiveItem] = useState<string>(
        data.nav_option_name === data.problem_name
            ? "description"
            : data.nav_option_name
    );
    onOptionClick(activeItem);

    const [activeItemWidth, setActiveItemWidth] = useState<string>("");
    const [translateXActiveItem, setTranslateXActiveItem] = useState<number>(0);

    useEffect(() => {
        const active = document.getElementById(activeItem);
        const width = active?.clientWidth;
        setActiveItemWidth((width || 0) - 40 + "px");
        setTranslateXActiveItem(active?.offsetLeft || 0);
    }, []);

    const handleMenuItemsHover = (event: React.MouseEvent<HTMLDivElement>) => {
        const targetWidth = event.currentTarget.offsetWidth;
        setCurrentWidth(targetWidth + "px");
        setTranslateX(event.currentTarget.offsetLeft);
        setPrevIsInMenu(isInMenu);
    };

    const handleActiveItem = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        setActiveItem(target.id);
        setActiveItemWidth(target.clientWidth - 40 + "px");
        setTranslateXActiveItem(target.offsetLeft);
        onOptionClick(target.id);
    };

    return (
        <div
            className="relative bg-slate-800 w-fit flex flex-row h-[50px] rounded-t-lg text-[14px] items-center text-gray-500 overflow-hidden select-none"
            onMouseOver={() => setIsInMenu(true)}
            onMouseOut={() => setIsInMenu(false)}
        >
            <div
                className="h-[32px] bg-slate-600 absolute opacity-transition box-content rounded"
                id="hover-rect"
                style={{
                    width: currentWidth,
                    transition: `transform ${
                        prevIsInMenu ? "150ms" : "0ms"
                    }, width ${prevIsInMenu ? "150ms" : "0ms"}, opacity 150ms`,
                    transform: `translateX(${translateX}px)`,
                    opacity: isInMenu ? 1 : 0,
                }}
            ></div>
            <div
                id="active-underline"
                className="absolute h-[2px] bg-white bottom-0"
                style={{
                    width: activeItemWidth,
                    transition: `all 150ms`,
                    transform: `translateX(${translateXActiveItem + 20}px)`,
                }}
            ></div>
            <Link to={`/problem/${data.problem_name}`}>
                <div
                    id="description"
                    className={`ml-[9px] z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative ${
                        activeItem === "description" ? "text-white " : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                    onClick={(event) => {
                        handleActiveItem(event);
                    }}
                >
                    Description
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/editorial`}>
                <div
                    id="editorial"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        activeItem === "editorial" ? "text-white " : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                    onClick={(event) => {
                        handleActiveItem(event);
                        console.log("object");
                    }}
                >
                    Editorial
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/solutions`}>
                <div
                    id="solutions"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        activeItem === "solutions" ? "text-white " : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                    onClick={(event) => {
                        handleActiveItem(event);
                    }}
                >
                    Solutions
                </div>
            </Link>
            <Link to={`/problem/${data.problem_name}/submissions`}>
                <div
                    id="submissions"
                    className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                        activeItem === "submissions" ? "text-white " : ""
                    }`}
                    onMouseOver={handleMenuItemsHover}
                    onClick={(event) => {
                        handleActiveItem(event);
                    }}
                >
                    Submissions
                </div>
            </Link>
        </div>
    );
};

export default ProblemNavbar;
