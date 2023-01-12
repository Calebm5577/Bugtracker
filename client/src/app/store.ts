import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import changetext from "../features/changetext/ChangetextSlice";
import authSlice from "../features/Auth/authSlice";
import { apiSlice } from "../features/api/apiSlice";
import { rtkQueryErrorLogger } from "../middleware/errorMiddleware";
import sideBarSlice from "../features/SideBar/SideBar";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    changetext: changetext,
    sidebar: sideBarSlice,
    auth: authSlice,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
