import "./Button.css"
import * as React from "react";

type Props = {
    name: string,
    disabled?: boolean,
    onClick: () => void
}

const button = ({name, disabled, onClick}: Props) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            {name}
        </button>
    );
};

export const Button = React.memo(button)