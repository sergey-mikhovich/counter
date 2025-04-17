const COUNTER_STORAGE_STATE_KEY = "counter_storage_state_key"

export type CounterStorageState = {
    maxValue: string
    startValue: string
}

export const saveCounterStorageState = (value: CounterStorageState) => {
    try {
        localStorage.setItem(COUNTER_STORAGE_STATE_KEY, JSON.stringify(value));
    } catch { /* empty */ }
}

export const readCounterStorageState = (): CounterStorageState | undefined => {
    try {
        const value = localStorage.getItem(COUNTER_STORAGE_STATE_KEY);
        return value ? JSON.parse(value) : undefined;
    } catch {
        return undefined
    }
}