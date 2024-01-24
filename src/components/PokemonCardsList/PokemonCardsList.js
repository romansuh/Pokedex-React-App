import PokemonCard from "./PokemonCard";
import "./PokemonCardsList.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPokemons} from "../../store/features/pokemonSlice";
import {POKE_API_URL_FIRST} from "../../common/pokeapi";
import LoadMoreButton from "./LoadMoreButton";
import LoadPreviousButton from "./LoadPreviousButton";

const PokemonCardsList = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemon.pokemons);
    const status = useSelector(state => state.pokemon.status);

    useEffect(() => {
        dispatch(fetchPokemons(POKE_API_URL_FIRST))
    }, [dispatch])

    const renderContent = () => {
        if (status === "loading") {
            return <h1 className="loading_msg">Loading...</h1>
        }

        return (
            <>
                {pokemons.map(pokemon => {
                    return <PokemonCard name={pokemon.name} pokeapiURL={pokemon.url}/>
                })}
                <LoadMoreButton/>
                <LoadPreviousButton/>
            </>
        );
    }


    return (
        <div className="cards_list_container">
            {renderContent()}
        </div>
    );
}

export default PokemonCardsList;