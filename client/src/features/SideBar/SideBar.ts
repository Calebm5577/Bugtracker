import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";
// import { fetchCount } from './counterAPI';

//Get user from sessionStorage
// let user = sessionStorage.getItem("user");

interface server {
  name: String;
  id: String;
}

export interface AuthState {
  user: string | null;
  userServers: Array<server> | null;
  message: string;
  //   status: "idle" | "loading" | "failed";
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState = {
  user: null,
  userServers: [],
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
};

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // reset: (state) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isError = false;
    //   state.message = "";
    // },

    updateUserServers: (state, action) => {
      state.userServers = action.payload;
    },
  },
});

export const { updateUserServers } = sideBarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

// export const statusMessage = (state: RootState) => state.auth.message;
// export const currentuser = (state: RootState) => state.auth.user;
// export const loading = (state: RootState) => state.auth.isLoading;
// export const error = (state: RootState) => state.auth.isError;
export const servers = (state: RootState) => state.sidebar.userServers;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default sideBarSlice.reducer;
