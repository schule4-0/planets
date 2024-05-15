export const getStoredValue = async (key: string): Promise<string | null> => {
        return new Promise((resolve) => {
                resolve(localStorage.getItem(key));
        });
};

export const setStoredValue = async (key: string, value: string): Promise<void> => {
        return new Promise((resolve) => {
                localStorage.setItem(key, value);
                resolve();
        });
};

export const removeStoredValue = async (key: string): Promise<void> => {
        return new Promise((resolve) => {
                localStorage.removeItem(key);
                resolve();
        });
};