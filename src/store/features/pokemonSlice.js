import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {POKE_API_URL_FIRST, POKE_API_URL_SECOND} from "../../common/pokeapi";

export const fetchPokemons = createAsyncThunk("pokemons/fetchPokemons", async (url) => {
    const response = await axios.get(url);
    return {data: response.data, currentURL: response.request.responseURL};
})

const initialState = {
    url: {
        previous: null,
        current: POKE_API_URL_FIRST,
        next: POKE_API_URL_SECOND
    },
    pokemons: [],
    infoPokemonURL: null,
    status: "idle",
}

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setInfoPokemonURL: (state, action) => {
            state.infoPokemonURL = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPokemons.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = "succeeded";

                const response = action.payload;

                state.url = {
                    previous: response.data.previous,
                    current: response.currentURL,
                    next: response.data.next
                };

                state.pokemons = [...state.pokemons, ...response.data.results];
            })
    }
});


export const {setInfoPokemonURL} = pokemonSlice.actions;
export default pokemonSlice.reducer;
