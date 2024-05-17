export const getStoredValue = async (key: string): Promise<any> => {
        return new Promise((resolve) => {
                resolve(localStorage.getItem(key));
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
        return getStoredValue("selectedRocket");

};

export const getGender = async (): Promise<string | null> => {
        return getStoredValue("selectedGender")
};

export const getHairColor = async (): Promise<string | null> => {
        return getStoredValue("selectedHairColorWord")
};

export const getRocketColor = async (): Promise<any> => {
        return getStoredValue("selectedRocketColorWord")
};

export const getCharacterName = async (): Promise<string | null> => {
        return getStoredValue("characterName")
};

export const setGender = async (value: string): Promise<void> => {
        return setStoredValue("selectedGender", value)
};

export const setRocketType  = async (value: string): Promise<void> => {
        return setStoredValue("selectedRocket", value)
};

export const setHairColor = async (value: string): Promise<void> => {
        return setStoredValue("selectedHairColorWord", value)
};
export const setRocketColor = async (value: string): Promise<void> => {
        return setStoredValue("selectedRocketColorWord", value)
};
export const setCharacterName = async (value: string): Promise<void> => {
        return setStoredValue("characterName", value)
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