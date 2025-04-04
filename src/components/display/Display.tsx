import "./Display.css"
import {Frame} from "../frame/Frame.tsx";
import * as React from "react";

type Props = {
    value: string;
    error?: string;
    prompt?: string
    className: string;
}

const display = ({value, error, prompt, className}: Props) => {
    const displayClasses = [
        "display",
        error ? "display-error" : "",
        prompt ? "display-prompt" : ""
    ]

    return (
        <Frame classNames={`${displayClasses.join(" ")} ${className}`}>
            {error || prompt || value}
        </Frame>
    );
};

export const Display = React.memo(display)