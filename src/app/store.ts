import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import counterReducer, {CounterState} from "../features/counter/counterSlice.ts";
import {readCounterStorageState} from "../features/counter/localStorage.ts";

const counterStorageState = readCounterStorageState()

const preloadedState: CounterState = {
    maxValue: counterStorageState ? counterStorageState.maxValue : "",
    startValue: counterStorageState ? counterStorageState.startValue : "",
    isInputError: false,
    isInputCompleted: false,
    mode: "unset"
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
    preloadedState: {
        counter: preloadedState
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>