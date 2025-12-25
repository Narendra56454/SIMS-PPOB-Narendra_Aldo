import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice";
import bannerReducer from "./bannerSlice";
import profileReducer from "./profileSlice";
import balanceReducer from "./balanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    banners: bannerReducer,
    profile: profileReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
