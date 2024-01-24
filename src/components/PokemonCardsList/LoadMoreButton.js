import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons} from "../../store/features/pokemonSlice";
import loading from "../../loading.svg";

const LoadMoreButton = ({requestStatus}) => {
    const url = useSelector(state => state.pokemon.url);
    const dispatch = useDispatch();

    const handleLoadMore = () => {
        dispatch(fetchPokemons(url.next))
    }

    return (
        <button
            className={`load_more_btn ${requestStatus}`}
            onClick={handleLoadMore}
            disabled={url.next === null || requestStatus === "loading"}
        >
            {requestStatus === "loading" ?
                (
                    <>
                        <img src={loading} alt="Loading spinner"/>
                        <span>&nbsp;&nbsp;&nbsp;Loading data...</span>
                    </>
                ) :
                (
                    <span>Load more</span>
                )
            }
        </button>
    );
}

export default LoadMoreButton;