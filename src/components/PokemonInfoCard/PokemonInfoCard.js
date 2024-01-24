import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPokemonInfo} from "../../common/pokeapi";
import {capitalizeFirstLetter} from "../../App";

const PokemonInfoCard = () => {
    const pokeapiURL = useSelector(state => state.pokemon.infoPokemonURL)

    const [sprite, setSprite] = useState('');
    const [name, setName] = useState('');
    const [types, setTypes] = useState('');
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
                setTypes(pokemonInfo.types.map(slot => capitalizeFirstLetter(slot.type.name)).join(", "));
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

    return (
        <div className="info_card_container">
            <img src={sprite} alt="Pokemon sprite"/>
            <table>
                <thead>
                <tr>
                    <th>{capitalizeFirstLetter(name)}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Type</td>
                    <td>{types}</td>
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