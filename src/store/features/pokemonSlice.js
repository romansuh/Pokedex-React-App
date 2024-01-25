import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {POKE_API_URL_FIRST, POKE_API_URL_SECOND} from "../../common/pokeapi";

export const fetchPokemons = createAsyncThunk("pokemons/fetchPokemons", async (url) => {
    const response = await axios.get(url);
    return {data: response.data, currentURL: response.request.responseURL};
})

export const fetchAllPokemonsByType = createAsyncThunk("pokemons/fetchAllPokemonsByType", async (url) => {
    const response = await axios.get(url);
    return response.data;
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
    isByType: false,
}

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setInfoPokemonURL: (state, action) => {
            state.infoPokemonURL = action.payload;
        },
        resetState: (state) => {
            state.url = {
                previous: null,
                current: POKE_API_URL_FIRST,
                next: POKE_API_URL_SECOND
            };

            state.pokemons = [];
            state.infoPokemonURL = null;
            state.status = "idle";
            state.isByType = false;
        }
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
                state.isByType = false;
            })
            .addCase(fetchAllPokemonsByType.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchAllPokemonsByType.fulfilled, (state, action) => {
                state.status = "succeeded";

                const response = action.payload;
                const typedPokemons = response.pokemon.map(slot => slot.pokemon);

                state.pokemons = typedPokemons;
                state.isByType = true;
            })
    }
});


export const {setInfoPokemonURL, resetState} = pokemonSlice.actions;
export default pokemonSlice.reducer;
