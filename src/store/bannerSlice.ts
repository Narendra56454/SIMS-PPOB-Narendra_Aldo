import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBanners, Banner } from "../api/banner";

interface BannerState {
    data: Banner[];
    loading: boolean;
    error: string | null;
}

const initialState: BannerState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchBanners = createAsyncThunk(
    "banners/fetch",
    async (token: string, { rejectWithValue }) => {
        const response = await getBanners(token);

        if (response.status === 108) {
            return rejectWithValue("UNAUTHORIZED");
        }

        return response.data;
    }
);

const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default bannerSlice.reducer;
