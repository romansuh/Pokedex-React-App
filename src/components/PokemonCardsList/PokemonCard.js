import {useContext, useEffect, useState} from "react";
import {fetchPokemonInfo} from "../../common/pokeapi";
import {capitalizeFirstLetter, InfoVisibleContext} from "../../App";

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    unknown: '#FFF',
    shadows: '#2b033866'
}

const PokemonCard = ({
                         name,
                         pokeapiURL
                     }) => {
    const [types, setTypes] = useState([]);
    const [spriteURL, setSpriteURL] = useState("");

    const {handleInfoVisible} = useContext(InfoVisibleContext);

    useEffect(() => {
        const getPokemonTypes = async () => {
            try {
                const pokemonInfo = await fetchPokemonInfo(pokeapiURL);

                const pokemonTypes = pokemonInfo.types.map(slot => slot.type.name);
                const pokemonSpriteURL = pokemonInfo.sprites.front_default;

                setTypes(pokemonTypes);
                setSpriteURL(pokemonSpriteURL);
            } catch (error) {
                console.log('Error fetching pokemon info:', error)
            }
        }

        getPokemonTypes();

    }, [pokeapiURL])

    return (
        <div
            className="card_container"
            tabIndex={1}
            onClick={() => handleInfoVisible(pokeapiURL)}

        >
            <img src={spriteURL} alt="Pokemon sprite"/>

            <h4>{capitalizeFirstLetter(name)}</h4>

            <div className="types_container">
                {types.map(type => {
                    return (
                        <div
                            key={typeColors[type]}
                            className="type_badge"
                            style={{backgroundColor: typeColors[type]}}
                        >
                            <span className="type_name">{capitalizeFirstLetter(type)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PokemonCard;