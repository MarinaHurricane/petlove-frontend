export type Species =
  | "dog"
  | "cat"
  | "monkey"
  | "bird"
  | "snake"
  | "turtle"
  | "lizard"
  | "frog"
  | "fish"
  | "ants"
  | "bees"
  | "butterfly"
  | "spider"
  | "scorpion"
  | "rabbit";

export type Category = "found" | "free" | "lost" | "sell";

export type Gender = "female" | "male" | "multiple" | "unknown";

export interface Pet {
  _id: string;
  species: Species;
  category: Category;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  gender: Gender;
  location: string;
  imgURL: string;
  user?: string;
  popularity: number;
  createdAt: string;
  updatedAt: string;
}
