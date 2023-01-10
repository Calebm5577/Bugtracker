// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",

  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user;
      console.log("token in prepare headers");
      console.log(token);

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice;

// The hooks are automatically named based on a standard convention:
// use, the normal prefix for any React hook
// The name of the endpoint, capitalized
// The type of the endpoint, Query or Mutation
// In this case, our endpoint is getPosts and it's a query endpoint,
//  so the generated hook is useGetPostsQuery.
// baseURL: "http://localhost:3001"
