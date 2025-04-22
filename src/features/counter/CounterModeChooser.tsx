import {Button} from "@/components/button/Button.tsx";
import "@/App.css"

export type CounterMode = "normal" | "advanced" | "unset"

type Props = {
    onSetCounterMode: (value: CounterMode) => void;
}

const CounterModeChooser = ({onSetCounterMode}: Props) => {
    return (
        <div>
            <div className={"counterMode"}>
                <Button name={"Normal counter"} onClick={() => onSetCounterMode("normal")}/>
                <Button name={"Advanced counter"} onClick={() => onSetCounterMode("advanced")}/>
            </div>
        </div>
    );
};

export default CounterModeChooser;