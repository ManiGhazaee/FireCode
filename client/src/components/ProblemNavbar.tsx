import React, { useEffect } from "react";
import { useState, useRef } from "react";

const ProblemNavbar = () => {
    const [currentWidth, setCurrentWidth] = useState<string>("");
    const [isInMenu, setIsInMenu] = useState<boolean>(false);
    const [prevIsInMenu, setPrevIsInMenu] = useState<boolean>(false);
    const [translateX, setTranslateX] = useState<number>(0);

    const [activeItem, setActiveItem] = useState<string>("description");
    const [activeItemWidth, setActiveItemWidth] = useState<string>("");
    const [translateXActiveItem, setTranslateXActiveItem] = useState<number>(0);

    useEffect(() => {
        const active = document.getElementById(activeItem);
        const width = active?.clientWidth;
        setActiveItemWidth((width || 0) - 40 + "px");
        setTranslateXActiveItem(active?.offsetLeft || 0);
    }, []);

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
        const target = event.currentTarget;
        setActiveItem(target.id);
        setActiveItemWidth(target.clientWidth - 40 + "px");
        setTranslateXActiveItem(target.offsetLeft);
    };

    const handleDescriptionOnClick = () => {};
    const handleEditorialOnClick = () => {};
    const handleSolutionsOnClick = () => {};
    const handleSubmissionsOnClick = () => {};

    return (
        <div
            className="relative bg-slate-800 flex flex-row h-[50px] rounded-t-lg text-[14px] items-center text-gray-500 overflow-hidden"
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
                id="active-underline"
                className="absolute h-[2px] bg-white bottom-0"
                style={{
                    width: activeItemWidth,
                    transition: `all 150ms`,
                    transform: `translateX(${translateXActiveItem + 20}px)`,
                }}
            ></div>
            <div
                id="description"
                className={`ml-[9px] z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative ${
                    activeItem === "description" ? "text-white " : ""
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
                className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                    activeItem === "editorial" ? "text-white " : ""
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
                className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                    activeItem === "solutions" ? "text-white " : ""
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
                className={`z-40 px-[20px] py-[14px] cursor-pointer hover:text-white transition relative p-[14px] ${
                    activeItem === "submissions" ? "text-white " : ""
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
