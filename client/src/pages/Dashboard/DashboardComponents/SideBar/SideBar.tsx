import React from "react";
import { useCreateWorkspaceMutation } from "../../../../features/api/endpoints/sideBarEndpoints";
// import  HiPlus  from "react-icons/fa";
import { currentuser, updateUser } from "../../../../features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";

export function SideBar() {
  const user = useAppSelector(currentuser);
  const [createWorkspace, { isError, isLoading, isSuccess, data }] =
    useCreateWorkspaceMutation();

  const createWorkspaceFunc = async () => {
    try {
      let newWorkspace = await createWorkspace({
        name: "sample name",
        user: user,
      }).unwrap();
      console.log(newWorkspace);
      //dispatch updated state after req
    } catch (e) {
      console.log(`something went wrong: ${e}`);
    }
  };

  if (isLoading) {
    console.log("is loading");
  }

  if (isSuccess) {
    console.log("is success");
  }

  if (isError) {
    console.log("is error");
  }

  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "10vw",
        maxWidth: "200px",
        flexDirection: "column",
        border: "1px solid red",
        justifyContent: "space-between",
      }}
    >
      <button
        style={{
          border: "1px solid blue",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
        }}
        onClick={createWorkspaceFunc}
      >
        {/* <div style={{ color: "green", fontSize: "48px" }}>+</div>
         */}
        click
      </button>
      <div
        style={{
          border: "1px solid blue",
          height: "80%",
        }}
      >
        WORKSPACES
      </div>

      <div
        style={{
          border: "1px solid blue",
          height: "10%",
        }}
      >
        USER
      </div>
    </div>
  );
}
