import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api/auth";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

const getStoredAuth = () => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");

    if (!token || !expiry) return null;

    if (Date.now() > Number(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        return null;
    }

    return token;
};

const tokenFromStorage = getStoredAuth();

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
            localStorage.removeItem("token_expiry");
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

                const expiryTime = Date.now() + TOKEN_EXPIRY_MS;
                localStorage.setItem("token", action.payload);
                localStorage.setItem("token_expiry", expiryTime.toString());
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
