import {POKE_API_URL_FIRST, POKE_API_URL_TYPE_BASE, POKEMON_TYPES} from "../../common/pokeapi";
import {capitalizeFirstLetter, InfoContext} from "../../App";
import {useDispatch} from "react-redux";
import {fetchAllPokemonsByType, fetchPokemons, resetState} from "../../store/features/pokemonSlice";
import {useContext} from "react";

const SelectPokemonsType = () => {
    const dispatch = useDispatch();
    const {setInfoVisible} = useContext(InfoContext);

    const handleSelectPokemonsType = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const selectedType = formJson.selectedType;

        setInfoVisible(false)

        if (selectedType === "none") {
            dispatch(resetState());
            dispatch(fetchPokemons(POKE_API_URL_FIRST));
        } else {
            dispatch(resetState());
            dispatch(fetchAllPokemonsByType(POKE_API_URL_TYPE_BASE + selectedType + '/'))
        }
    }

    return (
        <form onSubmit={handleSelectPokemonsType}>
            <label>
                Get all pokemons of type:
                <select name="selectedType" defaultValue="none">
                    <option value="none">None</option>
                    {POKEMON_TYPES.map(
                        type => {
                            return (
                                <option key={type} value={type}>
                                    {capitalizeFirstLetter(type)}
                                </option>
                            );
                        }
                    )}
                </select>
            </label>
            <button type="submit" className="select_type_btn">Filter</button>
        </form>
    );
};

export default SelectPokemonsType;