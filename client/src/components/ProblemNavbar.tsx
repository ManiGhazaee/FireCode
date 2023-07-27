import React from "react";
import { useState, useRef } from "react";

const ProblemNavbar = () => {
    const [currentWidth, setCurrentWidth] = useState<string>("");
    const [isInMenu, setIsInMenu] = useState<boolean>(false);
    const [prevIsInMenu, setPrevIsInMenu] = useState<boolean>(false);
    const [translateX, setTranslateX] = useState<number>(0);

    const [activeItem, setActiveItem] = useState<string>("description");

    const descriptionRef = useRef<HTMLDivElement>(null);
    const editorialRef = useRef<HTMLDivElement>(null);
    const solutionsRef = useRef<HTMLDivElement>(null);
    const submissionsRef = useRef<HTMLDivElement>(null);
    const hoverRectRef = useRef<HTMLDivElement>(null);

    const handleMenuItemsHover = (event: React.MouseEvent<HTMLDivElement>) => {
        const targetWidth = event.currentTarget.offsetWidth;
        setCurrentWidth(targetWidth + "px");
        setTranslateX(event.currentTarget.offsetLeft);
        setPrevIsInMenu(isInMenu);
    };

    const handleActiveItem = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveItem(event.currentTarget.id);
    };

    const handleDescriptionOnClick = () => {};
    const handleEditorialOnClick = () => {};
    const handleSolutionsOnClick = () => {};
    const handleSubmissionsOnClick = () => {};

    return (
        <div
            className="relative bg-slate-800 flex flex-row h-[50px] rounded-t-lg text-[14px] items-center text-gray-500"
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
                ref={hoverRectRef}
            ></div>
            <div
                id="description"
                className={`ml-[9px] z-40 px-[20px] py-[10px] cursor-pointer hover:text-white transition relative ${
                    activeItem === "description"
                        ? "text-white after:w-[calc(100%-40px)] after:h-[2px] after:block after:z-50 after:bg-white after:absolute after:left-[50%] after:translate-x-[-50%] after:bottom-[-3px] after:rounded-lg"
                        : ""
                }`}
                ref={descriptionRef}
                onMouseOver={handleMenuItemsHover}
                onClick={(event) => {
                    handleActiveItem(event);
                    handleDescriptionOnClick();
                }}
            >
                Description
            </div>
            <div
                id="editorial"
                className={`z-40 px-[20px] py-[10px] cursor-pointer hover:text-white transition relative ${
                    activeItem === "editorial"
                        ? "text-white after:w-[calc(100%-40px)] after:h-[2px] after:block after:z-50 after:bg-white after:absolute after:left-[50%] after:translate-x-[-50%] after:bottom-[-3px] after:rounded-lg"
                        : ""
                }`}
                ref={editorialRef}
                onMouseOver={handleMenuItemsHover}
                onClick={(event) => {
                    handleActiveItem(event);
                    handleEditorialOnClick();
                }}
            >
                Editorial
            </div>
            <div
                id="solutions"
                className={`z-40 px-[20px] py-[10px] cursor-pointer hover:text-white transition relative ${
                    activeItem === "solutions"
                        ? "text-white after:w-[calc(100%-40px)] after:h-[2px] after:block after:z-50 after:bg-white after:absolute after:left-[50%] after:translate-x-[-50%] after:bottom-[-3px] after:rounded-lg"
                        : ""
                }`}
                ref={solutionsRef}
                onMouseOver={handleMenuItemsHover}
                onClick={(event) => {
                    handleActiveItem(event);
                    handleSolutionsOnClick();
                }}
            >
                Solutions
            </div>
            <div
                id="submissions"
                className={`z-40 px-[20px] py-[10px] cursor-pointer hover:text-white transition relative ${
                    activeItem === "submissions"
                        ? "text-white after:w-[calc(100%-40px)] after:h-[2px] after:block after:z-50 after:bg-white after:absolute after:left-[50%] after:translate-x-[-50%] after:bottom-[-3px] after:rounded-lg"
                        : ""
                }`}
                ref={submissionsRef}
                onMouseOver={handleMenuItemsHover}
                onClick={(event) => {
                    handleActiveItem(event);
                    handleSubmissionsOnClick();
                }}
            >
                Submissions
            </div>
        </div>
    );
};

export default ProblemNavbar;
