import { MyCustomGlobal } from "./classes";

interface Name {
  value: string;
  type: string;
  items: any[];
}

interface Description {
  value: string;
  type: string;
  items: any[];
}

interface Continent {
  value: string;
  type: string;
  items: string[];
}

interface Diet {
  value: string;
  type: string;
  items: string[];
}

interface Family {
  value: string;
  type: string;
  items: any[];
}

interface Weight {
  value: string;
  type: string;
  items: any[];
}

interface TimeOnEarth {
  value: string;
  type: string;
  items: any[];
}

interface Period {
  value: string;
  type: string;
  items: any[];
}

interface BodyLength {
  value: string;
  type: string;
  items: any[];
}

interface Image {
  value: string;
  type: string;
  items: any[];
}

interface MainArticle {
  value: Value;
  type: string;
  items: any[];
}

interface Value {
  mainHeader: string;
  sections: Section[];
  list: List[];
}

interface Section {
  id: string;
  header: string;
  paragraphs: Paragraph[];
}

interface Paragraph {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
}

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

  interface EditDinosaur {
    name: Name;
    description: Description;
    continent: Continent;
    diet: Diet;
    family: Family;
    weight: Weight;
    time_on_earth: TimeOnEarth;
    period: Period;
    bodyLength: BodyLength;
    image: Image;
    mainArticle: MainArticle;
  }
  interface DinosaurMainArticle {
    sections: {
      id: string;
      header: string;
      paragraphs: { id: string; text: string }[];
    }[];
    mainHeader: string;
    list: { id: string; text: string }[];
  }
}

export { Dinosaur };
