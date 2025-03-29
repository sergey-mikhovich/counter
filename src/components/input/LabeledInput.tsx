import "./LabeledInput.css"
import {ChangeEvent} from "react";

type Props = {
    label: string;
    value: string;
    error: boolean;
    onChange: (value: string) => void;
}

export const LabeledInput = (props: Props) => {

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value);
    }

    const inputClasses = [
        "inputContainer-input",
        props.error ? "inputContainer-input-error" : ""
    ]

    return (
        <div className={"inputContainer"}>
            <div className={"inputContainer-label"}>{props.label}</div>
            <input className={inputClasses.join(" ")} type={"number"} value={props.value} onChange={onChange}/>
        </div>
    );
};