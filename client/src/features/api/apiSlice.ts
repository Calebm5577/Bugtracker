// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
    }),
    signIn: builder.mutation({
      query: (xyz) => ({
        url: "/posts",
        method: "POST",
        // Include the entire post object as the body of the request
        body: xyz,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery, useSignInMutation } = apiSlice;

// The hooks are automatically named based on a standard convention:

// use, the normal prefix for any React hook
// The name of the endpoint, capitalized
// The type of the endpoint, Query or Mutation
// In this case, our endpoint is getPosts and it's a query endpoint,
//  so the generated hook is useGetPostsQuery.