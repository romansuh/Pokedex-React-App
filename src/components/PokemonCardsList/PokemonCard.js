import axios from "axios";
import {useEffect, useState} from "react";

const fetchPokemonTypes = async (pokeURL) => {
    const response = await axios.get(pokeURL);
    return response.data.types;
};

const PokemonCard = ({
                         name,
                         pokeapiURL
                     }) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const getPokemonTypes = async () => {
            try {
                const pokemonTypesSlots = await fetchPokemonTypes(pokeapiURL);
                const pokemonTypes = pokemonTypesSlots.map(slot => slot.type.name)
                setTypes(pokemonTypes);
            } catch (error) {
                console.log('Error fetching pokemon types:', error)
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
            <img src="#" alt="Pokemon sprite" className="card_image"/>
            <h4 className="card_title">{name}</h4>
            <div className="types_container">
                {types.map(type => {
                    return (
                        <div className="type_badge">
                            <span className="type_name">{type}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PokemonCard;