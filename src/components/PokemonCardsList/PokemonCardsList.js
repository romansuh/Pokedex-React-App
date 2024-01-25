import PokemonCard from "./PokemonCard";
import "./PokemonCardsList.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {fetchPokemons} from "../../store/features/pokemonSlice";
import {POKE_API_URL_FIRST} from "../../common/pokeapi";
import LoadMoreButton from "./LoadMoreButton";

const PokemonCardsList = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemon.pokemons);
    const status = useSelector(state => state.pokemon.status);
    const isByType = useSelector(state => state.pokemon.isByType);

    const listBottomRef = useRef(null);

    useEffect(() => {
        dispatch(fetchPokemons(POKE_API_URL_FIRST))
    }, [dispatch])

    useEffect(() => {
        listBottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [pokemons])

    const renderPokemonsList = () => {
        if (isByType && pokemons.length === 0) {
            return <span>Seems that no such pokemons are known!</span>
        }

        return (
            <>
                {pokemons.map(pokemon => {
                    const key = pokemon.url.split("/").slice(-2, -1);
                    return <PokemonCard key={key} name={pokemon.name} pokeapiURL={pokemon.url}/>
                })}
                <div ref={listBottomRef}/>
            </>
        );
    }

    return (
        <div className="cards_list_btn_container">
            <div className="cards_list_container">
                {renderPokemonsList()}
            </div>
            {!isByType && <LoadMoreButton requestStatus={status}/>}
        </div>
    );
}

export default PokemonCardsList;