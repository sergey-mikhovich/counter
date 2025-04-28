const COUNTER_STORAGE_STATE_KEY = "counter_storage_state_key"

export type CounterStorageState = {
    maxValue: string
    startValue: string
}

export const counterLS = {
    save(value: CounterStorageState) {
        try {
            localStorage.setItem(COUNTER_STORAGE_STATE_KEY, JSON.stringify(value));
        } catch { /* empty */ }
    },

    read(): CounterStorageState | null {
        try {
            const value = localStorage.getItem(COUNTER_STORAGE_STATE_KEY);
            return value ? JSON.parse(value) : undefined;
        } catch {
            return null
        }
    }
}