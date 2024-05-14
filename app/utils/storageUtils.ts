export const isClient = (): boolean => typeof window !== 'undefined';

export const getStoredValue = (key: string): string | null => {
    if (isClient()) {
        return localStorage.getItem(key);
    }
    return null;
};

export const setStoredValue = (key: string, value: string): void => {
    if (isClient()) {
        localStorage.setItem(key, value);
    }
};

export const removeStoredValue = (key: string): void => {
    if (isClient()) {
        localStorage.removeItem(key);
    }
};
