import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/auth";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthState = {
    token: tokenFromStorage,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (
        payload: { email: string; password: string },
        { rejectWithValue }
    ) => {
        const result = await login(payload);

        if (result.status !== 0) {
            return rejectWithValue(result.message);
        }

        return result.data.token;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                localStorage.setItem("token", action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
