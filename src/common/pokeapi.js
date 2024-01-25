import axios from "axios";

export const POKE_API_URL_FIRST = "https://pokeapi.co/api/v2/pokemon/?limit=12";
export const POKE_API_URL_SECOND = "https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12";
export const POKE_API_URL_TYPE_BASE = "https://pokeapi.co/api/v2/type/";


export const fetchPokemonInfo = async (pokeURL) => {
    const response = await axios.get(pokeURL);
    return response.data;
};

export const POKEMON_TYPES = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
    "unknown",
    "shadow"
]