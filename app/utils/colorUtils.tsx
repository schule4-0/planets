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
const getHairColors = (): Color[] => hairColors;

export { getHairColors };
