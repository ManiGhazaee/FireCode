import React from "react";
import { convertMarkdownToHtml } from "../ts/utils/utils";

const Editorial = ({ data }: { data: string }) => {
    return (
        <div>
            <div
                dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(data),
                }}
            ></div>
        </div>
    );
};

export default Editorial;
