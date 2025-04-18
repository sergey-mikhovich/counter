import './App.css'
import {useCallback, useEffect, useState} from "react";
import {CounterConfigurator} from "./features/counter/CounterConfigurator.tsx";
import {Counter} from "./features/counter/Counter.tsx";
import CounterModeChooser, {CounterMode} from "./features/counter/CounterModeChooser.tsx";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {
    inputCompletedStatusChanged, inputErrorStatusChanged,
    maxValueChanged, modeChanged, saveCounterStorageStateThunk,
    selectIsInputCompleted,
    selectIsInputError,
    selectMaxValue, selectMode,
    selectStartValue, startValueChanged
} from "./features/counter/counterSlice.ts";

function App() {
    const maxValue = useAppSelector(selectMaxValue)
    const startValue = useAppSelector(selectStartValue)
    const isInputError = useAppSelector(selectIsInputError)
    const isInputCompleted = useAppSelector(selectIsInputCompleted)
    const mode = useAppSelector(selectMode)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (maxValue && startValue) {
            dispatch(inputCompletedStatusChanged(true));
        }
    }, []);

    useEffect(() => {
        if (isInputCompleted) {
            dispatch(saveCounterStorageStateThunk({maxValue: maxValue, startValue: startValue}))
        }
    }, [isInputCompleted]);

    const onSetCounterMode = useCallback((value: CounterMode) => {
        dispatch(modeChanged(value));
    }, [])

    const toggleSettings = useCallback(() => {
        setIsSettingsOpen(prevState => !prevState);
    }, [])

    const onSet = useCallback((startValue: string, maxValue: string) => {
        dispatch(inputCompletedStatusChanged(true));
        dispatch(startValueChanged(startValue))
        dispatch(maxValueChanged(maxValue))
        
        if (mode === "advanced") {
            toggleSettings()
        }

    }, [mode, toggleSettings])

    const onChangeMaxValue = useCallback((value: string) => {
        dispatch(inputCompletedStatusChanged(false));
        dispatch(maxValueChanged(value));
    }, [])

    const onChangeStartValue = useCallback((value: string) => {
        dispatch(inputCompletedStatusChanged(false));
        dispatch(startValueChanged(value));
    }, [])

    const changeInputError = useCallback((value: boolean) => {
        dispatch(inputErrorStatusChanged(value))
    }, [])


    if (mode === "unset") {
        return <CounterModeChooser onSetCounterMode={onSetCounterMode}/>
    }

    return (
        <div className={"appContainer"}>
            {
                ((mode === "advanced" && isSettingsOpen) || mode === "normal") &&
                <CounterConfigurator
                    maxValue={maxValue}
                    setMaxValue={onChangeMaxValue}
                    startValue={startValue}
                    setStartValue={onChangeStartValue}
                    onInputError={changeInputError}
                    onSet={onSet}/>
            }
            {
                ((mode === "advanced" && !isSettingsOpen) || mode === "normal") &&
                <Counter
                    isInputCompleted={isInputCompleted}
                    isInputError={isInputError}
                    maxValue={maxValue}
                    startValue={startValue}
                    onSet={toggleSettings}
                    mode={mode}/>
            }
        </div>
    )
}

export default App