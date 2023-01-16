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
    deleteBug: builder.mutation({
      query: (authObject) => ({
        url: "/editBugs/deleteBug",
        method: "POST",
        body: { authObject },
      }),
    }),
    editBugTitle: builder.mutation({
      query: (authObject) => ({
        url: "/editBugs/editBugTitle",
        method: "POST",
        body: { authObject },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useDeleteBugMutation, useEditBugTitleMutation } = extendedApi;
