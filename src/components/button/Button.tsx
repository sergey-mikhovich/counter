import "./Button.css"

type Props = {
    name: string,
    disabled?: boolean,
    onClick: () => void
}

export const Button = ({name, disabled, onClick}: Props) => {
    return (
        <button disabled={disabled} onClick={onClick}>
            {name}
        </button>
    );
};