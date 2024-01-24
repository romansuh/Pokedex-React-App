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

    const listBottomRef = useRef(null);

    useEffect(() => {
        dispatch(fetchPokemons(POKE_API_URL_FIRST))
    }, [dispatch])

    useEffect(() => {
        listBottomRef.current?.scrollIntoView({behavior: "smooth"});
    }, [pokemons])

    return (
        <div className="cards_list_btn_container">
            <div className="cards_list_container">
                {pokemons.map(pokemon => {
                    return <PokemonCard name={pokemon.name} pokeapiURL={pokemon.url}/>
                })}
                <div ref={listBottomRef}/>
            </div>
            <LoadMoreButton requestStatus={status}/>
        </div>
    );
}

export default PokemonCardsList;