import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";
// import { fetchCount } from './counterAPI';

export interface AuthState {
  message: string;
  //   status: "idle" | "loading" | "failed";
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface AuthObject {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

const initialState: AuthState = {
  message: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const testLogin = createAsyncThunk("auth/testLogin", async () => {
  // const response = await fetchCount(amount);
  const response = await axios.get("http://localhost:3001/api/auth/logout");
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const Signup = createAsyncThunk(
  "auth/Signup",
  async (authobject: AuthObject) => {
    // const response = await fetchCount(amount);
    console.log("started");
    const response = await axios.post(
      "/api/auth/signup",
      {
        firstName: authobject.firstName,
        lastName: authobject.lastName,
        email: authobject.email,
        password: authobject.password,
      },
      { withCredentials: true, baseURL: "http://localhost:3001/" }
    );
    console.log(response);
    console.log("finished");
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(testLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(testLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(testLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(Signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(Signup.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(Signup.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const { reset } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const statusMessage = (state: RootState) => state.auth.message;

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

export default authSlice.reducer;