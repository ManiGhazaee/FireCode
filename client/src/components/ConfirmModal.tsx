import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

const ConfirmModal = ({
    display,
    displayFn,
    onOkFn,
    title,
    message,
    okStyle,
    cancelStyle,
}: {
    display: boolean;
    displayFn: Dispatch<SetStateAction<boolean>>;
    onOkFn: Function;
    title: string;
    message: string;
    okStyle?: React.CSSProperties;
    cancelStyle?: React.CSSProperties;
}) => {
    return createPortal(
        <>
            <div
                onClick={() => displayFn(false)}
                className={`w-screen h-screen ${
                    display ? "fixed" : "hidden"
                } top-0 left-0 z-[100] backdrop-blur-sm `}
            ></div>
                <div
                    className="fixed w-[400px] max-w-[400px] h-fit bg-black border border-borders rounded-lg top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-[110]"
                    style={{
                        display: display ? "block" : "none",
                    }}
                >
                    <h3 className="text-center text-[24px] font-bold my-[20px]">
                        {title}
                    </h3>
                    <p className="text-[14px] text-center my-[20px]">{message}</p>
                    <div className="flex flex-row relative bottom-0 justify-evenly mt-[40px] mb-[8px]">
                        <div
                            className="w-[calc(50%-12px)] text-center border border-red-600 rounded text-red-600 hover:bg-red-600 hover:text-white cursor-pointer text-[14px] py-[4px]"
                            onClick={() => onOkFn()}
                        >
                            Ok
                        </div>
                        <div
                            className="w-[calc(50%-12px)] text-center border border-borders rounded cursor-pointer hover:bg-white hover:text-black hover:border-white text-[14px] py-[4px]"
                            onClick={() => displayFn(false)}
                        >
                            Cancel
                        </div>
                    </div>
            </div>
        </>,
        document.body
    );
};

export default ConfirmModal;
