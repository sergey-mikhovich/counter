import './App.css'
import {useState} from "react";
import {CounterConfigurator} from "./components/CounterConfigurator.tsx";
import {Counter} from "./components/Counter.tsx";
import CounterModeChooser, {CounterMode} from "./CounterModeChooser.tsx";

function App() {
    const [maxValue, setMaxValue] = useState<string>("");
    const [startValue, setStartValue] = useState<string>("");
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isInputCompleted, setIsInputCompleted] = useState<boolean>(false);
    const [mode, setMode] = useState<CounterMode>("unset");
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    function onSetCounterMode(value: CounterMode) {
        setMode(value);
    }

    function onOpenSettings() {
        setIsSettingsOpen(true);
    }

    function onSet(startValue: string, maxValue: string) {
        setStartValue(startValue)
        setMaxValue(maxValue)
        setIsInputCompleted(true);
        setIsSettingsOpen(false);
    }

    function onChangeMaxValue(value: string) {
        setMaxValue(value);
        setIsInputCompleted(false);
    }

    function onChangeStartValue(value: string) {
        setStartValue(value);
        setIsInputCompleted(false)
    }

    function changeInputError(value: boolean) {
        setIsInputError(value)
    }

    switch (mode) {
        case "unset": {
            return <CounterModeChooser onSetCounterMode={onSetCounterMode}/>
        }
        case "advanced": {
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
                            onSet={onOpenSettings}
                            mode={mode}/>
                    }
                </div>
            )
        }
        default: {
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
                        onSet={onOpenSettings}
                        mode={mode}/>
                </div>
            )
        }
    }
}

export default App