import {capitalizeFirstLetter} from "../../App";
import "./TypeBadge.css";


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

const TypeBadge = ({type}) => {
    return (
        <div
            key={typeColors[type]}
            className="type_badge"
            style={{backgroundColor: typeColors[type]}}
        >
            <span className="type_name">{capitalizeFirstLetter(type)}</span>
        </div>
    );
};

export default TypeBadge;