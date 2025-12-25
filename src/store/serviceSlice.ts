import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getServices, Service } from "../api/service";

interface ServiceState {
    data: Service[];
    loading: boolean;
    error: string | null;
}

const initialState: ServiceState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchServices = createAsyncThunk(
    "services/fetch",
    async (token: string, { rejectWithValue }) => {
        const response = await getServices(token);

        if (response.status === 108) {
            return rejectWithValue("UNAUTHORIZED");
        }

        return response.data;
    }
);

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default serviceSlice.reducer;
