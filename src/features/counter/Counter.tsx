import {Frame} from "../../components/frame/Frame.tsx";
import {Display} from "../../components/display/Display.tsx";
import {Button} from "../../components/button/Button.tsx";
import {useCallback, useEffect, useState} from "react";
import "../../App.css"
import "../../components/display/Display.css"
import {CounterMode} from "./CounterModeChooser.tsx";

type Props = {
    startValue: string;
    maxValue: string;
    isInputCompleted: boolean;
    isInputError: boolean;
    onSet: () => void;
    mode: CounterMode;
}

export const Counter = ({startValue, maxValue, isInputError, isInputCompleted, onSet, mode}: Props) => {
    const [counterValue, setCounterValue] = useState(0);

    useEffect(() => {
        if (isInputCompleted) {
            setCounterValue(JSON.parse(startValue))
        }
    }, [startValue, isInputCompleted]);

    const increment = useCallback(() => {
        if (counterValue < JSON.parse(maxValue)) {
            setCounterValue(counterValue + 1)
        }
    }, [counterValue, maxValue])

    const reset = useCallback(() => {
        setCounterValue(JSON.parse(startValue))
    }, [startValue])

    const disableAllButtons = !isInputCompleted || isInputError;

    const disableIncrementButton = disableAllButtons || (counterValue === JSON.parse(maxValue));
    const disableDecrementButton = disableAllButtons || (counterValue === JSON.parse(startValue));

    const error = isInputError ? "Incorrect value!" : ""
    const prompt = !isInputCompleted ? "Enter values and press SET" : ""
    const value = startValue ? String(counterValue) : startValue
    const maxValueReached = maxValue && counterValue === JSON.parse(maxValue);

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
                { mode === "advanced" && <Button name={"set"} onClick={onSet}/> }
            </Frame>
        </Frame>
    )
};