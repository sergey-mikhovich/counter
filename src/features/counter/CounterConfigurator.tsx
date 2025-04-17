import {Frame} from "../../components/frame/Frame.tsx";
import {Button} from "../../components/button/Button.tsx";
import {useCallback, useEffect, useState} from "react";
import "../../App.css"
import {LabeledInput} from "../../components/input/LabeledInput.tsx";

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

    const onValidate = useCallback((startValue: string, maxValue: string) => {
        const startValueMoreOrEqualThenMaxValue =
            (startValue && maxValue) ? Number(startValue) >= Number(maxValue) : false

        const maxValueLessOrEqualThenStartValue =
            (startValue && maxValue) ? Number(maxValue) <= Number(startValue) : false

        const isStartValueError = startValue ? (Number(startValue) < 0 || startValueMoreOrEqualThenMaxValue) : false
        const isMaxValueError = maxValue ? (Number(maxValue) < 0 || maxValueLessOrEqualThenStartValue) : false
        const isInputError = isStartValueError || isMaxValueError;
        const disabledButton = isInputError || !startValue || !maxValue

        setStartValueError(isStartValueError)
        setMaxValueError(isMaxValueError)

        onInputError(isInputError);
        setDisabledButton(disabledButton)
    }, [onInputError])

    useEffect(() => {
        if (startValue || maxValue) {
            onValidate(startValue, maxValue)
        }
    }, [startValue, maxValue, onValidate])

    const onChangeMaxValue = useCallback((value: string) => {
        setMaxValue(value);
    }, [setMaxValue])

    const onChangeStartValue = useCallback((value: string) => {
        setStartValue(value);
    }, [setStartValue])

    const onSetClick = useCallback(() => {
        onSet(startValue, maxValue)
        setDisabledButton(true);
    }, [startValue, maxValue, onSet])

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