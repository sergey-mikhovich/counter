import "./Display.css"
import {Frame} from "../frame/Frame.tsx";

type Props = {
    value: string;
    error?: string;
    prompt?: string
    className: string;
}

export const Display = ({value, error, prompt, className}: Props) => {
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