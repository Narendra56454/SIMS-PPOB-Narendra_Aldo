import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactionHistories, TransactionResponse } from "../api/transaction";

interface TransactionHistoriesState {
    data: TransactionResponse[];
    loading: boolean;
    error: string | null;
    offset: number;
    hasMore: boolean;
}

const initialState: TransactionHistoriesState = {
    data: [],
    loading: false,
    error: null,
    offset: 0,
    hasMore: true,
};

export const getHistories = createAsyncThunk(
    "transaction/history",
    async ({ token, offset, limit }: { token: string; offset: number; limit: number }, { rejectWithValue }) => {
        const response = await getTransactionHistories(token, offset, limit);

        if (response.status === 108) {
            return rejectWithValue("UNAUTHORIZED");
        }

        return response.data;
    }
);

const transactionHistorySlice = createSlice({
    name: "TransactionHistory",
    initialState,
    reducers: {
        resetHistories: (state) => {
            state.data = [];
            state.offset = 0;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHistories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...(action.payload.records || [])];
                state.offset += (action.payload.records?.length || 0);
                state.hasMore = (action.payload.records?.length || 0) > 0;
            })
            .addCase(getHistories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetHistories } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
