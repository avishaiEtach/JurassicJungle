import { MyCustomGlobal } from "./classes";

declare global {
  interface Dinosaur {
    name: string;
    description: string;
    continent: "NA" | "AF" | "EU" | "AS" | "SA";
    diet: "Carnivore" | "Piscivore" | "Herbivore";
    family: string;
    image: string;
    weight: number;
    time_on_earth: string;
    period: string;
    mainArticle: string;
    bodyLength: number;
    _id: string;
  }
}

export { Dinosaur };
