import {Frame} from "./frame/Frame.tsx";
import {Button} from "./button/Button.tsx";
import {useCallback, useEffect, useState} from "react";
import "../App.css"
import {LabeledInput} from "./input/LabeledInput.tsx";

type Props = {
    maxValue: string,
    setMaxValue: (value: string) => void,
    startValue: string,
    setStartValue: (value: string) => void,
    onInputError: (value: boolean) => void,
    onSet: (startValue: string, maxValue: string) => void
}

export const CounterConfigurator = ({onInputError, startValue, maxValue, setMaxValue, setStartValue, onSet}: Props) => {
    const [disabledButton, setDisabledButton] = useState(true);
    const [maxValueError, setMaxValueError] = useState(false);
    const [startValueError, setStartValueError] = useState(false);

    const onValidate = useCallback((startValue: number, maxValue: number) => {
        if (maxValue === startValue) {
            setMaxValueError(true);
            setStartValueError(true);
            setDisabledButton(true)
            onInputError(true)
            return
        }

        const isStartValueError = startValue < 0 || startValue > maxValue
        const isMaxValueError = maxValue < 0 || maxValue < startValue
        const isInputError = isStartValueError || isMaxValueError;

        setStartValueError(isStartValueError)
        setMaxValueError(isMaxValueError)

        onInputError(isInputError);
        setDisabledButton(isInputError)
    }, [])

    useEffect(() => {
        if (startValue || maxValue) {
            onValidate(JSON.parse(startValue), JSON.parse(maxValue))
        }
    }, [startValue, maxValue, onValidate])

    function onChangeMaxValue(value: string) {
        setMaxValue(value);
    }

    function onChangeStartValue(value: string) {
        setStartValue(value);
    }

    function onSetClick() {
        if (!startValue) {
            setStartValueError(true);
        }

        if (!maxValue) {
            setMaxValueError(true);
        }

        if (startValue && maxValue) {
            onSet(startValue, maxValue)
            setDisabledButton(true);
        }
    }

    return (
        <Frame classNames={"counterConfigurator"}>
            <Frame classNames={"counterConfigurator-inputs"}>
                <LabeledInput error={maxValueError} label={"Max value"} value={maxValue} onChange={onChangeMaxValue}/>
                <LabeledInput error={startValueError} label={"Start value"} value={startValue} onChange={onChangeStartValue}/>
            </Frame>
            <Frame classNames={"counterConfigurator-buttonContainer"}>
                <Button disabled={disabledButton} name={"set"} onClick={onSetClick}/>
            </Frame>
        </Frame>
    )
};