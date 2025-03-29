import {Frame} from "./frame/Frame.tsx";
import {Display} from "./display/Display.tsx";
import {Button} from "./button/Button.tsx";
import {useEffect, useState} from "react";
import "../App.css"
import "../components/display/Display.css"

type Props = {
    startValue: string;
    maxValue: string;
    isInputCompleted: boolean;
    isInputError: boolean;
}

export const Counter = ({startValue, maxValue, isInputError, isInputCompleted}: Props) => {
    const [counterValue, setCounterValue] = useState<number>(0);

    useEffect(() => {
        if (isInputCompleted) {
            setCounterValue(Number(startValue))
        }
    }, [startValue, isInputCompleted]);

    function increment() {
        if (counterValue < Number(maxValue)) {
            setCounterValue(counterValue + 1)
        }
    }

    function reset() {
        setCounterValue(Number(startValue))
    }

    const disableAllButtons = !isInputCompleted || isInputError;

    const disableIncrementButton = disableAllButtons || (counterValue === Number(maxValue));
    const disableDecrementButton = disableAllButtons || (counterValue === Number(startValue));

    const error = isInputError ? "Incorrect value!" : ""
    const prompt = !isInputCompleted ? "Enter values and press SET" : ""
    const value = startValue ? String(counterValue) : startValue
    const maxValueReached = maxValue && counterValue === Number(maxValue);

    const displayClasses = [
        "counter-display",
        !error && !prompt && maxValueReached ? "display-redColor" : ""
    ]

    return (
        <Frame classNames={"counter"}>
            <Display
                className={displayClasses.join(" ")}
                error={error}
                prompt={prompt}
                value={value}/>
            <Frame classNames={"counter-buttons"}>
                <Button disabled={disableIncrementButton} name={"inc"} onClick={increment}/>
                <Button disabled={disableDecrementButton} name={"reset"} onClick={reset}/>
            </Frame>
        </Frame>
    )
};