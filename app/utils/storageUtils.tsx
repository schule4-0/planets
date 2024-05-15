export const getStoredValue = (key: string): string | null => {
        return localStorage.getItem(key);
};

export const setStoredValue = (key: string, value: string): void => {
        localStorage.setItem(key, value);
};

export const removeStoredValue = (key: string): void => {
        localStorage.removeItem(key);
};
