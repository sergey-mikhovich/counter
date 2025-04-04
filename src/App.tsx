import './App.css'
import {useCallback, useEffect, useState} from "react";
import {CounterConfigurator} from "./components/CounterConfigurator.tsx";
import {Counter} from "./components/Counter.tsx";
import CounterModeChooser, {CounterMode} from "./components/CounterModeChooser.tsx";

const MAX_VALUE_KEY = "max_value_key"
const START_VALUE_KEY = "start_value_key"

function App() {
    const [maxValue, setMaxValue] = useState("");
    const [startValue, setStartValue] = useState("");
    const [isInputError, setIsInputError] = useState(false);
    const [isInputCompleted, setIsInputCompleted] = useState(false);
    const [mode, setMode] = useState<CounterMode>("unset");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const maxValue = localStorage.getItem(MAX_VALUE_KEY)
        const startValue = localStorage.getItem(START_VALUE_KEY)

        if (maxValue) {
            setMaxValue(maxValue);
        }

        if (startValue) {
            setStartValue(startValue);
        }

        if (maxValue && startValue) {
            setIsInputCompleted(true);
        }
    }, []);

    useEffect(() => {
        if (isInputCompleted) {
            localStorage.setItem(MAX_VALUE_KEY, maxValue)
            localStorage.setItem(START_VALUE_KEY, startValue)
        }
    }, [isInputCompleted]);

    const onSetCounterMode = useCallback((value: CounterMode) => {
        setMode(value);
    }, [])

    const onSettingsChanged = useCallback((value: boolean) => {
        if (mode === "advanced") {
            setIsSettingsOpen(value)
        }
    }, [mode])

    const onSet = useCallback((startValue: string, maxValue: string) => {
        setStartValue(startValue)
        setMaxValue(maxValue)
        setIsInputCompleted(true);
        onSettingsChanged(false)
    }, [onSettingsChanged])

    const onChangeMaxValue = useCallback((value: string) => {
        setMaxValue(value);
        setIsInputCompleted(false);
    }, [])

    const onChangeStartValue = useCallback((value: string) => {
        setStartValue(value);
        setIsInputCompleted(false)
    }, [])

    const changeInputError = useCallback((value: boolean) => {
        setIsInputError(value)
    }, [])


    if (mode === "unset") {
        return <CounterModeChooser onSetCounterMode={onSetCounterMode}/>
    }

    if (mode === "advanced") {
        return (
            <div className={"appContainer"}>
                {
                    isSettingsOpen &&
                    <CounterConfigurator
                        maxValue={maxValue}
                        setMaxValue={onChangeMaxValue}
                        startValue={startValue}
                        setStartValue={onChangeStartValue}
                        onInputError={changeInputError}
                        onSet={onSet}/>
                }
                {
                    !isSettingsOpen &&
                    <Counter
                        isInputCompleted={isInputCompleted}
                        isInputError={isInputError}
                        maxValue={maxValue}
                        startValue={startValue}
                        onSet={() => onSettingsChanged(true)}
                        mode={mode}/>
                }
            </div>
        )
    }

    return (
        <div className={"appContainer"}>
            <CounterConfigurator
                maxValue={maxValue}
                setMaxValue={onChangeMaxValue}
                startValue={startValue}
                setStartValue={onChangeStartValue}
                onInputError={changeInputError}
                onSet={onSet}/>
            <Counter
                isInputCompleted={isInputCompleted}
                isInputError={isInputError}
                maxValue={maxValue}
                startValue={startValue}
                onSet={() => onSettingsChanged(true)}
                mode={mode}/>
        </div>
    )
}

export default App