import { apiSlice } from "../apiSlice";
import { store } from "../../../app/store";
import { sideBarSlice, updateUserServers } from "../../SideBar/SideBar";

// inside sideBarEndPoints also contains endpoints for the home page
// such as getting assigned taks from all workspaces
// and notificatons for the user

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

    getNotifications: builder.query({
      query: () => ({
        url: "/userData/getNotifications",
        method: "GET",
      }),
    }),

    acceptOrDenyNotificatons: builder.mutation({
      query: (authObject) => ({
        url: "/userData/acceptOrDenyNotificatons",
        method: "POST",
        body: { authObject },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateWorkspaceMutation,
  useSignOutQuery,
  useGetWorkspaceQuery,
  useGetNotificationsQuery,
  useAcceptOrDenyNotificatonsMutation,
} = extendedApi;
