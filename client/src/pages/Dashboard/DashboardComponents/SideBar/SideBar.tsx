import React, { ChangeEvent } from "react";
import { useCreateWorkspaceMutation } from "../../../../features/api/endpoints/sideBarEndpoints";
// import  HiPlus  from "react-icons/fa";
import { currentuser, updateUser } from "../../../../features/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { useGetWorkspaceQuery } from "../../../../features/api/endpoints/sideBarEndpoints";
import { servers } from "../../../../features/SideBar/SideBar";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SideBar(): JSX.Element {
  const user = useAppSelector(currentuser);
  const userServers = useAppSelector(servers);
  const [isModal, setIsModal] = useState(false);
  const [createServerName, setCreateServerName] = useState("");
  const [createWorkspace, { isError, isLoading, isSuccess, data }] =
    useCreateWorkspaceMutation();

  //handle change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCreateServerName(event.target.value);
  };

  const {
    isError: GetWorkspaceIsError,
    isLoading: GetWorkspaceIsLoading,
    isSuccess: GetWorkspaceIsSuccess,
    error: GetWorkspaceError,
    refetch,
  } = useGetWorkspaceQuery("");

  //function to handle popup modal
  // const change = () => {};

  // function to create workspace
  const createWorkspaceFunc = async () => {
    try {
      let newWorkspace = await createWorkspace({
        name: createServerName,
        user: user,
      }).unwrap();
      console.log(newWorkspace);
      //dispatch updated state after req
      let newservers = await refetch();
      console.log(newservers);
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

  if (GetWorkspaceIsLoading) {
    console.log("GetWorkspace is loading");
  }

  if (GetWorkspaceIsSuccess) {
    console.log("GetWorkspace is success");
  }

  if (GetWorkspaceIsError) {
    console.log(" GetWorkspace is error");
  }

  if (GetWorkspaceError) {
    console.log(" GetWorkspace error");
    console.log(GetWorkspaceError);
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
        onClick={() => createWorkspaceFunc()}
      >
        create server
      </button>
      <input
        type="text"
        placeholder="name of server"
        onChange={handleChange}
        value={createServerName}
      />
      {/* {isModal ? (
        <div style={{ position: "absolute", background: "#ffffff" }}>
          <h1>Modal</h1>
          <button onClick={() => setIsModal(false)}>close</button>
        </div>
      ) : (
        ""
      )} */}
      <div
        style={{
          border: "1px solid blue",
          height: "80%",
        }}
      >
        WORKSPACES
        {/* {console.log("user servers")} */}
        {userServers?.map((element: any, id) => {
          console.log("element");
          console.log(element);
          return (
            <Link to={`/server?name=${element.workspace}`}>
              <div
                key={id}
                style={{
                  border: "1px solid blue",
                  borderRadius: "50%",
                  marginTop: "25px",
                  textAlign: "center",
                }}
              >
                <p>{element.name}</p>
                {/* <p>{element.workspace}</p> */}
              </div>
            </Link>
          );
        })}
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
