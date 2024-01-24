import PokemonCard from "./PokemonCard";
import "./PokemonCardsList.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPokemons} from "../../store/features/pokemonSlice";
import {POKE_API_URL_FIRST} from "../../common/pokeapi";

const PokemonCardsList = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemon.pokemons);

    useEffect(() => {
        dispatch(fetchPokemons(POKE_API_URL_FIRST))
    })

    return (
        <div className="cards_list_container">
            {pokemons.map(pokemon => {
                return <PokemonCard name={pokemon.name} pokeapiURL={pokemon.url}/>
            })}
        </div>
    );
}

export default PokemonCardsList;