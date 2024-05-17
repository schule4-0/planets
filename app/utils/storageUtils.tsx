export const getStoredValue = async (key: string): Promise<any> => {
        return new Promise((resolve) => {
                resolve(localStorage.getItem(key));
                console.log(localStorage.getItem(key))
        });
};

export const setStoredValue = async (key: string, value: any): Promise<void> => {
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

export const getRocketType = async (): Promise<string | null> => {
        return new Promise((resolve) => {
                getStoredValue("selectedRocket").then(resolve);
        });
};

export const getGender = async (): Promise<string | null> => {
        return new Promise((resolve) => {
                getStoredValue("selectedGender").then(resolve);
        });
};

export const getHairColor = async (): Promise<string | null> => {
        return new Promise((resolve) => {
                getStoredValue("selectedHairColorWord").then(resolve);
        });
};

export const getRocketColor = async (): Promise<any> => {
        return new Promise((resolve) => {
                getStoredValue("selectedRocketColorWord").then(resolve);
        });
};

export const getCharacterName = async (): Promise<string | null> => {
        return new Promise((resolve) => {
                getStoredValue("characterName").then(resolve);
        });
};

export const setGender = async (value: string): Promise<void> => {
        return new Promise((resolve) => {
                setStoredValue("selectedGender", value).then(resolve);
        });
};

export const setRocketType  = async (value: string): Promise<void> => {
        return new Promise((resolve) => {
                setStoredValue("selectedRocket", value).then(resolve);
        });
};

export const setHairColor = async (value: string): Promise<void> => {
        return new Promise((resolve) => {
                setStoredValue("selectedHairColorWord", value).then(resolve);
        });
};
export const setRocketColor = async (value: string): Promise<void> => {
        return new Promise((resolve) => {
                setStoredValue("selectedRocketColorWord", value).then(resolve);
        });
};

export const setCharacterName = async (value: string): Promise<void> => {
        return new Promise((resolve) => {
                setStoredValue("characterName", value).then(resolve);
        });
};

export const getNeptune = async (): Promise<boolean> => {
        return getStoredValue("Neptune");
};

export const setNeptune = async (value: boolean): Promise<void> => {
        return setStoredValue("Neptune", value);
};

export const getUranus = async (): Promise<boolean> => {
        return getStoredValue("Uranus");
};

export const setUranus = async (value: boolean): Promise<void> => {
        return setStoredValue("Uranus", value);
};

export const getSaturn = async (): Promise<boolean> => {
        return getStoredValue("Saturn");
};

export const setSaturn = async (value: boolean): Promise<void> => {
        return setStoredValue("Saturn", value);
};

export const getJupiter = async (): Promise<boolean> => {
        return getStoredValue("Jupiter");
};

export const setJupiter = async (value: boolean): Promise<void> => {
        return setStoredValue("Jupiter", value);
};

export const getMars = async (): Promise<boolean> => {
        return getStoredValue("Mars");
};

export const setMars = async (value: boolean): Promise<void> => {
        return setStoredValue("Mars", value);
};

export const getEarth = async (): Promise<boolean> => {
        return getStoredValue("Earth");
};

export const setEarth = async (value: boolean): Promise<void> => {
        return setStoredValue("Earth", value);
};

export const getVenus = async (): Promise<boolean> => {
        return getStoredValue("Venus");
};

export const setVenus = async (value: boolean): Promise<void> => {
        return setStoredValue("Venus", value);
};

export const getMercury = async (): Promise<boolean> => {
        return getStoredValue("Mercury");
};

export const setMercury = async (value: boolean): Promise<void> => {
        return setStoredValue("Mercury", value);
};

export const setSun = async (value: boolean): Promise<void> => {
        return setStoredValue("Sun", value);
};

export const getSun = async (): Promise<boolean> => {
        return getStoredValue("Sun");
};