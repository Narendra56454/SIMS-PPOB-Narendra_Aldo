import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBalance, Balance } from "../api/balance";

interface BalanceState {
    data: Balance | null;
    loading: boolean;
    error: string | null;
}

const initialState: BalanceState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchBalance = createAsyncThunk(
    "balance/fetch",
    async (token: string, { rejectWithValue }) => {
        const response = await getBalance(token);

        if (response.status === 108) {
            return rejectWithValue("UNAUTHORIZED");
        }

        return response.data;
    }
);

const profileSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;
