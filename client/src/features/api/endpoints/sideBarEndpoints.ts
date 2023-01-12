import { apiSlice } from "../apiSlice";
import { store } from "../../../app/store";
import { sideBarSlice, updateUserServers } from "../../SideBar/SideBar";

// directly importing the store to get current user as its used in every request
// not sure if better way to handle this
// const user = "user";

// console.log(`user inside sidebarenpoints ${user}`);

interface workspaceObj {
  name: string;
  user: string | null;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    example: builder.query({
      query: () => "test",
    }),
    createWorkspace: builder.mutation({
      query: (sentObj: workspaceObj) => ({
        url: "/userData/createWorkspace",
        method: "POST",
        // Include the entire post object as the body of the request
        body: { sentObj },
      }),
      //   transformResponse: (responseData: authObject) => {
      //     console.log("transform in signin");
      //     console.log(responseData);

      //     let token = responseData.RefreshToken
      //       ? responseData.RefreshToken
      //       : null;

      //     console.log("before token check");

      //     if (token) {
      //       console.log("gonna set session storage now!");
      //       sessionStorage.setItem(
      //         "user",
      //         JSON.stringify(token.replace('"', ""))
      //       );
      //     }
      //     console.log(`response data from authEndpoint ${responseData}`);
      //     console.log(`${responseData.RefreshToken}`);
      //     return responseData;
      //   },
    }),
    getWorkspace: builder.query({
      query: () => ({
        url: "/userData/getWorkspaces",
        method: "GET",
        // Include the entire post object as the body of the request
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data from onQueryStart");
          console.log(data);
          // dispatch user servers to sideBarSlice component
          if (data) {
            dispatch(updateUserServers(data.servers));
          }
        } catch (err) {
          console.log("error");
          console.log(err);
        }
      },
    }),

    signOut: builder.query({
      query: () => ({
        url: "/auth/signout",
        method: "GET",
        // Include the entire post object as the body of the request
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateWorkspaceMutation,
  useSignOutQuery,
  useGetWorkspaceQuery,
} = extendedApi;
