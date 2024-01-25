import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPokemonInfo} from "../../common/pokeapi";
import {capitalizeFirstLetter} from "../../App";
import "./PokemonInfoCard.css";
import TypeBadge from "../TypeBadge/TypeBadge";

const getPokemonIndex = (pokeapiURL) => {
    console.log(pokeapiURL);
    const id = pokeapiURL.split("/").slice(-2, -1).toString();
    return id.padStart(4, "0");
}

const PokemonInfoCard = () => {
    const pokeapiURL = useSelector(state => state.pokemon.infoPokemonURL)

    const [sprite, setSprite] = useState('');
    const [name, setName] = useState('');
    const [types, setTypes] = useState([]);
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [hp, setHp] = useState('');
    const [spAttack, setSpAttack] = useState('');
    const [spDefense, setSpDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [weight, setWeight] = useState('');
    const [totalMoves, setTotalMoves] = useState('');

    useEffect(() => {
        const setPokemonInfo = async () => {
            try {
                const pokemonInfo = await fetchPokemonInfo(pokeapiURL);
                const stats = pokemonInfo.stats;

                setSprite(pokemonInfo.sprites.front_default);
                setName(pokemonInfo.name);
                setTypes(pokemonInfo.types.map(slot => slot.type.name));
                setHp(stats[0].base_stat);
                setAttack(stats[1].base_stat);
                setDefense(stats[2].base_stat);
                setSpAttack(stats[3].base_stat);
                setSpDefense(stats[4].base_stat);
                setSpeed(stats[5].base_stat);
                setWeight(pokemonInfo.weight);
                setTotalMoves(pokemonInfo.moves.length);

            } catch (error) {
                console.log('Error fetching pokemon info:', error)
            }
        }

        setPokemonInfo();
    }, [pokeapiURL])

    const renderTypes = (types) => types.map(type => <TypeBadge key={type} type={type}/>);

    return (
        <div className="info_card_container">
            <img src={sprite} alt="Pokemon sprite"/>
            <table>
                <thead>
                <tr className="no_border">
                    <th colSpan={2}>{capitalizeFirstLetter(name) + `#${getPokemonIndex(pokeapiURL)}`}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Type(s)</td>
                    <td className="types_container_info">
                        {renderTypes(types)}
                    </td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td>{attack}</td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>{defense}</td>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>{hp}</td>
                </tr>
                <tr>
                    <td>SP Attack</td>
                    <td>{spAttack}</td>
                </tr>
                <tr>
                    <td>SP Defense</td>
                    <td>{spDefense}</td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>{speed}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{weight}</td>
                </tr>
                <tr>
                    <td>Total moves</td>
                    <td>{totalMoves}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PokemonInfoCard;