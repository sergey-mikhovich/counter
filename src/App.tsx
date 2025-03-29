import './App.css'
import {useState} from "react";
import {CounterConfigurator} from "./components/CounterConfigurator.tsx";
import {Counter} from "./components/Counter.tsx";

function App() {
    const [maxValue, setMaxValue] = useState<string>("");
    const [startValue, setStartValue] = useState<string>("");
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isInputCompleted, setIsInputCompleted] = useState<boolean>(false);

    function onSet(startValue: string, maxValue: string) {
        setStartValue(startValue)
        setMaxValue(maxValue)
        setIsInputCompleted(true);
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
                startValue={startValue}/>
        </div>
    )
}

export default App