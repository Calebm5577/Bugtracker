import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
// import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    console.log(
      " %c inside client middleware",
      "font: 14px;",
      "color: orange;"
    );
    if (isRejectedWithValue(action)) {
      console.warn("We got a rejected action!");
    }

    return next(action);
  };
