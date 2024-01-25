import './App.css';
import PokemonCardsList from "./components/PokemonCardsList/PokemonCardsList";
import {createContext, useState} from "react";
import PokemonInfoCard from "./components/PokemonInfoCard/PokemonInfoCard";
import {useDispatch} from "react-redux";
import {setInfoPokemonURL} from "./store/features/pokemonSlice";
import SelectPokemonsType from "./components/SelectPokemonsType/SelectPokemonsType";

export const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.substring(1);

export const InfoContext = createContext()

function App() {
    const [isInfoVisible, setInfoVisible] = useState(false);
    const dispatch = useDispatch();

    const handleInfoVisible = (pokeapiURL) => {
        dispatch(setInfoPokemonURL(pokeapiURL))
        setInfoVisible(true)
    }

    return (
        <InfoContext.Provider
            value={{setInfoVisible, handleInfoVisible}}
        >
            <div className="App">
                <SelectPokemonsType/>
                <PokemonCardsList handleInfoVisible={handleInfoVisible}/>
                {!isInfoVisible && <div className="pokemon_info_placeholder">Click on pokemon to get more info about it!</div>}
                {isInfoVisible && <PokemonInfoCard/>}
            </div>
        </InfoContext.Provider>
    );
}

export default App;
