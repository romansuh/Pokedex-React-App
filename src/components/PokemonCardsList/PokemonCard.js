import axios from "axios";
import {useEffect, useState} from "react";
import {fetchPokemonInfo} from "../../common/pokeapi";

const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.substring(1);

const PokemonCard = ({
                         name,
                         pokeapiURL
                     }) => {
    const [types, setTypes] = useState([]);
    const [spriteURL, setSpriteURL] = useState("");

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

    const handleCardClick = () => {
        console.log(2)
    }

    return (
        <div
            className="card_container"
            tabIndex={1}
            onClick={handleCardClick}
        >
            <img src={spriteURL} alt="Pokemon sprite" className="card_image"/>
            <h4 className="card_title">{capitalizeFirstLetter(name)}</h4>
            <div className="types_container">
                {types.map(type => {
                    return (
                        <div className="type_badge">
                            <span className="type_name">{capitalizeFirstLetter(type)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PokemonCard;