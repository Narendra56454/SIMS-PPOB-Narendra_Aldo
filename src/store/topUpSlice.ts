import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postTopUp, TopUpResponse } from "../api/topUp";

interface TopUpState {
    data: TopUpResponse | null;
    loading: boolean;
    error?: string;
}

const initialState: TopUpState = {
    data: null,
    loading: false,
};

export const topUp = createAsyncThunk(
    "topup",
    async (
        { token, amount }: { token: string; amount: number },
        { rejectWithValue }
    ) => {
        try {
            const res = await postTopUp(token, amount);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const balanceSlice = createSlice({
    name: "topup",
    initialState,
    reducers: {
        resetTopUp: (state) => {
            state.data = null;
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(topUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(topUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetTopUp } = balanceSlice.actions;
export default balanceSlice.reducer;
