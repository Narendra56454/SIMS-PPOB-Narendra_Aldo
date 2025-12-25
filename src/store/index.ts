import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import serviceReducer from "./serviceSlice";
import bannerReducer from "./bannerSlice";
import profileReducer from "./profileSlice";
import balanceReducer from "./balanceSlice";
import topupReducer from "./topUpSlice";
import transactionReducer from "./transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    banners: bannerReducer,
    profile: profileReducer,
    balance: balanceReducer,
    topUp: topupReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
