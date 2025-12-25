import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, Profile } from "../api/profile";

interface ProfileState {
    data: Profile | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchProfile = createAsyncThunk(
    "profile/fetch",
    async (token: string, { rejectWithValue }) => {
        const response = await getProfile(token);

        if (response.status === 108) {
            return rejectWithValue("UNAUTHORIZED");
        }

        return response.data;
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;
