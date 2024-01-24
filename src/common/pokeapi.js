import axios from "axios";

export const POKE_API_URL_FIRST = "https://pokeapi.co/api/v2/pokemon/?limit=12";
export const POKE_API_URL_SECOND = "https://pokeapi.co/api/v2/pokemon/?offset=12&limit=12"

export const fetchPokemonInfo = async (pokeURL) => {
    const response = await axios.get(pokeURL);
    return response.data;
};