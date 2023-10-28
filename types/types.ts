export type ToastType = "error" | "success" | "warning" | "info";

export interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
  duration: number;
}

export interface ToastAction {
  type: "SHOW" | "HIDE";
  payload?: {
    message?: string;
    type?: ToastType;
    duration?: number;
  };
}

export const PokTypeList: any = [
  { type: "normal", color: "#A8A77A" },
  { type: "fire", color: "#EE8130" },
  { type: "water", color: "#6390F0" },
  { type: "electric", color: "#F7D02C" },
  { type: "grass", color: "#7AC74C" },
  { type: "ice", color: "#96D9D6" },
  { type: "fighting", color: "#C22E28" },
  { type: "poison", color: "#A33EA1" },
  { type: "ground", color: "#E2BF65" },
  { type: "flying", color: "#A98FF3" },
  { type: "psychic", color: "#F95587" },
  { type: "bug", color: "#A6B91A" },
  { type: "rock", color: "#B6A136" },
  { type: "ghost", color: "#735797" },
  { type: "dragon", color: "#6F35FC" },
  { type: "dark", color: "#705746" },
  { type: "steel", color: "#B7B7CE" },
  { type: "fairy", color: "#D685AD" },
];

export const pokemonNames = [
  "Pidgey",
  "Charmander",
  "Squirtle",
  "Pikachu",
  "Bulbasaur",
  "Lapras",
  "Machop",
  "Ekans",
  "Diglett",
  "Pidgeotto",
  "Alakazam",
  "Onix",
  "Jynx",
  "Zubat",
  "Paras",
  "Rattata",
  "Vulpix",
  "Magikarp",
  "Jolteon",
  "Oddish",
  "Dewgong",
  "Hitmonlee",
  "Nidorina",
  "Geodude",
  "Fearow",
  "Rhydon",
  "Golbat",
  "Parasect",
  "Charizard",
  "Abra",
  "Mewtwo",
];
