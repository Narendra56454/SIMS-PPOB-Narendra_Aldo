import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfile, UpdateProfilePayload, Profile, updateProfileAvatar } from "../api/profile";

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

export const putProfile = createAsyncThunk<
    Profile,
    { token: string; payload: UpdateProfilePayload },
    { rejectValue: string }
>(
    "profile/update",
    async ({ token, payload }, { rejectWithValue }) => {
        try {
            const response = await updateProfile(token, payload);

            if (response.status !== 0) {
                return rejectWithValue(response.message || "Update failed");
            }

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Update failed");
        }
    }
);

export const putAvatar = createAsyncThunk<
    Profile,
    { token: string; file: File },
    { rejectValue: string }
>(
    "profile/updateAvatar",
    async ({ token, file }, { rejectWithValue }) => {
        try {
            const response = await updateProfileAvatar(token, file);

            if (response.status !== 0) {
                return rejectWithValue(response.message || "Avatar update failed");
            }

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Avatar update failed");
        }
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
            })
            .addCase(putProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(putProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(putAvatar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(putAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(putAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default profileSlice.reducer;
