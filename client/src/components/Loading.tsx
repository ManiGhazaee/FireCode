const Loading = ({
    For,
    color,
}: {
    For?: "pList" | "pDescription" | "pEditorial";
    color?: "white";
}) => {
    return (
        <>
            {For === "pDescription" ? (
                <div className="w-full h-full absolute top-0 left-0">
                    <div className="w-[140px] h-[16px] ml-[26px] mt-[44px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[280px] h-[14px] ml-[26px] mt-[36px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[52px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                </div>
            ) : For === "pEditorial" ? (
                <div className="w-full h-full absolute top-0 left-0">
                    <div className="w-[140px] h-[16px] ml-[26px] mt-[44px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[52px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                    <div className="w-[calc(100%-52px)] h-[10px] ml-[26px] mt-[11px] bg-borders animate-pulse rounded"></div>
                </div>
            ) : For === "pList" ? (
                <div className="relative">
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                    <div className="relative w-full h-[40px]">
                        <div className="absolute top-1/2 -translate-y-1/2 h-[14px] ml-[30px] w-[calc(100%-60px)] rounded bg-borders animate-pulse"></div>
                    </div>
                </div>
            ) : color === "white" ? (
                <div className="ispinner-w">
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                    <div className="ispinner-w-blade"></div>
                </div>
            ) : (
                <div className="ispinner">
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                    <div className="ispinner-blade"></div>
                </div>
            )}
        </>
    );
};

export default Loading;
