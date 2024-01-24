import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons} from "../../store/features/pokemonSlice";

const LoadMoreButton = () => {
    const url = useSelector(state => state.pokemon.url);
    const dispatch = useDispatch();

    const handleLoadMore = () => {
        dispatch(fetchPokemons(url.next))
    }

    return (
        <button
            className="load_more_btn"
            onClick={handleLoadMore}
            disabled={url.next === null}
        >Load More</button>
    );
}

export default LoadMoreButton;