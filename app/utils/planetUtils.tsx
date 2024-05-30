export type Planets =
    | "EARTH"
    | "NEPTUNE"
    | "URANUS"
    | "SATURN"
    | "JUPITER"
    | "MARS"
    | "VENUS"
    | "MERCURY"
    | "SUN";


export const getPlanetName = (planet: Planets, lang: string = "de"): string => {
    if (lang !== "de") {
        return planet.charAt(0) + planet.toLowerCase().slice(1);
    }

    switch (planet) {
        case "SUN":
            return "Sonne";
        case "MERCURY":
            return "Merkur";
        case "VENUS":
            return "Venus";
        case "EARTH":
            return "Erde";
        case "MARS":
            return "Mars";
        case "JUPITER":
            return "Jupiter";
        case "SATURN":
            return "Saturn";
        case "URANUS":
            return "Uranus";
        case "NEPTUNE":
            return "Neptun";
        default:
            return "Planet";
    }
};
