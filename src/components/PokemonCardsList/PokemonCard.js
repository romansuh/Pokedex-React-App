import {useContext, useEffect, useState} from "react";
import {fetchPokemonInfo} from "../../common/pokeapi";
import {capitalizeFirstLetter, InfoContext} from "../../App";
import TypeBadge from "../TypeBadge/TypeBadge";


const PokemonCard = ({
                         name,
                         pokeapiURL
                     }) => {
    const [types, setTypes] = useState([]);
    const [spriteURL, setSpriteURL] = useState("");

    const {handleInfoVisible} = useContext(InfoContext);

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
                        <TypeBadge key={type} type={type}/>
                    );
                })}
            </div>
        </div>
    );
}

export default PokemonCard;