import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CounterMode} from "./CounterModeChooser.tsx";
import {AppThunk, RootState} from "@/app/store.ts";
import {CounterStorageState, saveCounterStorageState} from "./localStorage.ts";

export interface CounterState {
    maxValue: string
    startValue: string
    isInputError: boolean
    isInputCompleted: boolean
    mode: CounterMode
}

const initialState: CounterState = {
    maxValue: "",
    startValue: "",
    isInputError: false,
    isInputCompleted: false,
    mode: "unset"
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        maxValueChanged: (state, action: PayloadAction<string>) => {
            state.maxValue = action.payload
        },
        startValueChanged: (state, action: PayloadAction<string>) => {
            state.startValue = action.payload
        },
        inputErrorStatusChanged: (state, action: PayloadAction<boolean>) => {
            state.isInputError = action.payload
        },
        inputCompletedStatusChanged: (state, action: PayloadAction<boolean>) => {
            state.isInputCompleted = action.payload
        },
        modeChanged: (state, action: PayloadAction<CounterMode>) => {
            state.mode = action.payload
        }
    }
})

export const {
    maxValueChanged,
    startValueChanged,
    inputErrorStatusChanged,
    inputCompletedStatusChanged,
    modeChanged
} = counterSlice.actions;

export default counterSlice.reducer;

export const selectMaxValue = (state: RootState) => state.counter.maxValue;
export const selectStartValue = (state: RootState) => state.counter.startValue;
export const selectIsInputError = (state: RootState) => state.counter.isInputError;
export const selectIsInputCompleted = (state: RootState) => state.counter.isInputCompleted;
export const selectMode = (state: RootState) => state.counter.mode;

export const saveCounterStorageStateThunk = (value: CounterStorageState): AppThunk => () => {
    saveCounterStorageState(value)
}