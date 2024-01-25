import './App.css';
import PokemonCardsList from "./components/PokemonCardsList/PokemonCardsList";
import {createContext, useState} from "react";
import PokemonInfoCard from "./components/PokemonInfoCard/PokemonInfoCard";
import {useDispatch} from "react-redux";
import {setInfoPokemonURL} from "./store/features/pokemonSlice";

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
            value={{handleInfoVisible}}
        >
            <div className="App">
                <PokemonCardsList handleInfoVisible={handleInfoVisible}/>
                {isInfoVisible && <PokemonInfoCard/>}
            </div>
        </InfoContext.Provider>
    );
}

export default App;
