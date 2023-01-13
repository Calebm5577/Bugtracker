import { apiSlice } from "../apiSlice";

interface authObject {
  message: string;
  RefreshToken: string;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBugBoard: builder.mutation({
      query: (authObject) => ({
        url: "/workspaceData/createBugBoard",
        method: "POST",
        // Include the entire post object as the body of the request
        body: authObject,
      }),
    }),

    createBug: builder.mutation({
      query: (authObject) => ({
        url: "/workspaceData/createBug",
        method: "POST",
        // Include the entire post object as the body of the request
        body: authObject,
      }),
    }),

    getBugs: builder.query({
      query: (authObject) => ({
        url: "/workspaceData/getBugs",
        method: "POST",
        body: authObject,
        // Include the entire post object as the body of the request
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBugBoardMutation,
  useCreateBugMutation,
  useGetBugsQuery,
} = extendedApi;
