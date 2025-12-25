import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postTransaction, TransactionResponse } from "../api/transaction";

interface TransactionState {
    data: TransactionResponse | null;
    loading: boolean;
    error?: string;
}

const initialState: TransactionState = {
    data: null,
    loading: false,
};

export const transaction = createAsyncThunk(
    "transaction",
    async (
        { token, code }: { token: string; code: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await postTransaction(token, code);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        resetTransaction: (state) => {
            state.data = null;
            state.error = undefined;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(transaction.pending, (state) => {
                state.loading = true;
            })
            .addCase(transaction.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(transaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
