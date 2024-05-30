import {Planets} from "@/app/utils/planetUtils";

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

export const getHair = async (): Promise<string | null> => {
    return getStoredValue("selectedHair")
};

export const getHairColor = async (): Promise<string | null> => {
    return getStoredValue("selectedHairColorCode")
};

export const getSkinColor = async (): Promise<string | null> => {
    return getStoredValue("selectedSkinColorCode")
};

export const getRocketColor = async (): Promise<any> => {
    return getStoredValue("selectedRocketColorWord")
};

export const getCharacterName = async (): Promise<string | null> => {
    return getStoredValue("characterName")
};

export const setHair = async (value: string): Promise<void> => {
    return setStoredValue("selectedHair", value)
};

export const setRocketType = async (value: string): Promise<void> => {
    return setStoredValue("selectedRocket", value)
};

export const setHairColor = async (value: string): Promise<void> => {
    return setStoredValue("selectedHairColorCode", value)
};

export const setSkinColor = async (value: string): Promise<void> => {
    return setStoredValue("selectedSkinColorCode", value)
};
export const setRocketColor = async (value: string): Promise<void> => {
    return setStoredValue("selectedRocketColorWord", value)
};
export const setCharacterName = async (value: string): Promise<void> => {
    return setStoredValue("characterName", value)
};

export function getPlanetState(planet: Planets) {
    return getStoredValue(planet.toLowerCase());
}

export const setPlanetState = async (planet: Planets, value: boolean): Promise<void> => {
    return setStoredValue(planet.toLowerCase(), value);
}