interface Color {
    code: string;
    word: string;
}

const colors: Color[] = [
    { code: "#000000", word: "dark" },
    { code: "#FFCB48", word: "blonde" },
    { code: "#673614", word: "brown" },
    { code: "#DF5026", word: "orange" }
];

const getColorWord = (colorCode: string): string => {
    const color = colors.find(c => c.code === colorCode);
    return color ? color.word : "Unknown";
};

const getColorCode = (colorWord: string): string => {
    const color = colors.find(c => c.word === colorWord);
    return color ? color.code : "";
};

const getColors = (): Color[] => colors;

export { getColorWord, getColorCode, getColors };
