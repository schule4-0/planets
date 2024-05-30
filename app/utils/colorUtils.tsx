interface Color {
    code: string;
    word: string;
}

const hairColors: Color[] = [
    { code: "#000000", word: "dark" },
    { code: "#FFCB48", word: "blonde" },
    { code: "#673614", word: "brown" },
    { code: "#DF5026", word: "orange" }
];

const skinColors: Color[] = [
    { code: "#FCD8B1", word: "bright" },
    { code: "#AF875C", word: "middle" },
    { code: "#3C210F", word: "dark" },
];

const rocketColors: Color[] = [
    { code: "#FF9900", word: "orange" },
    { code: "#5EC71E", word: "green" },
    { code: "#0E5CF3", word: "blue" },
    { code: "#CA0000", word: "red" },
    { code: "#FF00F5", word: "pink" },
    { code: "#7A41F3", word: "purple" },
    { code: "#FFE500", word: "yellow" }
];

const getHairColorIndex = (colorCode: string): number => {
    return hairColors.findIndex(color => color.code === colorCode);
};

const getSKinColorIndex = (colorCode: string): number => {
    return skinColors.findIndex(color => color.code === colorCode);
};

const getRocketColorIndex = (colorCode: string): number => {
    return rocketColors.findIndex(color => color.code === colorCode);
};

const getHairColors = (): Color[] => hairColors;
const getSkinColors = (): Color[] => skinColors;
const getRocketColors = (): Color[] => rocketColors;

export { getHairColors,getSkinColors, getRocketColors, getSKinColorIndex, getRocketColorIndex,getHairColorIndex};
