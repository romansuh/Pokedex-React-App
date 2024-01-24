import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons} from "../../store/features/pokemonSlice";

const LoadPreviousButton = () => {
    const url = useSelector(state => state.pokemon.url);
    const dispatch = useDispatch();

    const handleLoadPrevious = () => {
        dispatch(fetchPokemons(url.previous))
    }

    return (
        <button
            className="load_prev_btn"
            onClick={handleLoadPrevious}
            disabled={url.previous === null}
        >Load Previous</button>
    );
}

export default LoadPreviousButton;