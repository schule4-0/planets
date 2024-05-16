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
const rocketColor: Color[] = [
    { code: "#FF9900", word: "orange" },
    { code: "#5EC71E", word: "green" },
    { code: "#0E5CF3", word: "blue" },
    { code: "#CA0000", word: "red" },
    { code: "#FF00F5", word: "pink" },
    { code: "#7A41F3", word: "purple" },
    { code: "#FFE500", word: "yellow" }
];
const getHairColors = (): Color[] => hairColors;
const getRocketColors = (): Color[] => rocketColor;

export { getHairColors, getRocketColors};
