import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemons = createAsyncThunk("pokemons/fetchPokemons", async (url) => {
    const response = await axios.get(url);
    return response.data;
})

const initialState = {
    url: {
        previous: null,
        current: null,
        next: null
    },
    pokemons: [],
    status: "idle"
}

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchPokemons.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = "succeeded";

                const data = action.payload;

                state.url.previous = state.url.current;
                console.log(state.url.current)
                state.url.current = state.url.next;
                state.url.next = data.next;

                state.pokemons = data.results;
            })
    }
});

export default pokemonSlice.reducer;
