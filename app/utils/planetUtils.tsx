type Planets =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export const getPlanetName = (planet: Planets, lang: string = "de"): string => {
  if (lang !== "de") {
    return planet.charAt(0).toUpperCase() + planet.slice(1);
  }

  switch (planet.toLowerCase().trim()) {
    case "sun":
      return "Sonne";
    case "mercury":
      return "Merkur";
    case "venus":
      return "Venus";
    case "earth":
      return "Erde";
    case "mars":
      return "Mars";
    case "jupiter":
      return "Jupiter";
    case "saturn":
      return "Saturn";
    case "uranus":
      return "Uranus";
    case "neptune":
      return "Neptun";
    default:
      return "Planet";
  }
};
