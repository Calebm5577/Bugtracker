import React, { ChangeEvent, useState } from "react";
import {
  useGetBugsQuery,
  useCreateBugBoardMutation,
  useCreateBugMutation,
  useInviteWorkspaceMemberMutation,
} from "../../features/api/endpoints/workspaceEndpoints";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  useDeleteBugMutation,
  useEditBugTitleMutation,
} from "../../features/api/endpoints/editBugsEndpoints";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function Server() {
  let query = useQuery();
  console.log("url search params");
  console.log(query.get("name"));
  let server = query.get("name");
  let skipBool = server ? false : true;
  const [text, setText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    boardName: "",
    title: "",
    description: "",
    inviteUser: "",
    newTitle: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let name = event.target.name;

    setText((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  //create bug board
  const [
    createBug,
    {
      isError: CreateBugError,
      isLoading: CreateBugLoading,
      isSuccess: CreateBugSuccess,
      data: CreateBugData,
    },
  ] = useCreateBugMutation();

  //create bug in a board
  const [
    InviteWorkspaceMember,
    {
      isError: InviteWorkspaceMemberError,
      isLoading: InviteWorkspaceMemberLoading,
      isSuccess: InviteWorkspaceMemberSuccess,
      data: InviteWorkspaceMemberData,
    },
  ] = useInviteWorkspaceMemberMutation();

  //invite memeber to worksapce
  const [
    createBugBoard,
    {
      isError: createBugBoardError,
      isLoading: createBugBoardLoading,
      isSuccess: createBugBoardSuccess,
      data: createBugBoardData,
    },
  ] = useCreateBugBoardMutation();

  // delete bug in workspace
  const [
    DeleteBug,
    {
      isError: DeleteBugError,
      isLoading: DeleteBugLoading,
      isSuccess: DeleteBugSuccess,
      data: DeleteBugData,
    },
  ] = useDeleteBugMutation();

  //edit bug title

  const [
    EditBugTitle,
    {
      isError: EditBugTitleError,
      isLoading: EditBugTitleLoading,
      isSuccess: EditBugTitleSuccess,
      data: EditBugTitleData,
    },
  ] = useEditBugTitleMutation();

  //
  let sentObj = {
    server,
  };

  const { isError, isLoading, isSuccess, data } = useGetBugsQuery(sentObj, {
    skip: skipBool,
  });

  if (!server) {
    //toasties no server exists
    console.log("no server");
    return <Navigate to="/" />;
  }

  console.log("hello inside server");
  if (isError) {
    console.log("get bugs success in isError.tsx");
    console.log(isError);
  }

  if (isLoading) {
    console.log("get bugs success in isLoading.tsx");
    console.log(isLoading);
  }

  if (isSuccess) {
    console.log("get bugs success in server.tsx");
    console.log(isSuccess);
  }

  if (data) {
    console.log("get bugs data success");
    console.log(data);
  }
  //

  console.log("hello inside server");
  if (createBugBoardError) {
    console.log("success in createBugBoardError.tsx");
    console.log(createBugBoardError);
  }

  if (createBugBoardLoading) {
    console.log("success in createBugBoardLoading.tsx");
    console.log(createBugBoardLoading);
  }

  if (createBugBoardSuccess && createBugBoardData) {
    console.log("success icreateBugBoardSuccess.tsx");
    console.log(createBugBoardSuccess);
    console.log(createBugBoardData);
  }

  if (CreateBugData) {
    console.log("create bug data");
  }

  ///delete loadings:

  if (DeleteBugError) {
    console.log("success in DeleteBugError.tsx");
    console.log(DeleteBugError);
  }

  if (DeleteBugLoading) {
    console.log("success in DeleteBugLoading.tsx");
    console.log(DeleteBugError);
  }

  if (DeleteBugSuccess && DeleteBugData) {
    console.log("success DeleteBugSuccess.tsx");
    console.log(DeleteBugError);
    console.log(DeleteBugData);
  }

  if (CreateBugData) {
    console.log("create bug data");
  }

  const createNewBug = async (workspaceParam: any) => {
    try {
      await createBug(workspaceParam);
      //dispatch results here or in query endpoint
    } catch (e) {
      console.log("something went wrong");
      console.log(e);
    }
  };

  const createNewBugBoardFunc = async () => {
    let name = text.boardName;
    let sentObj = {
      name,
      workspace: server,
    };
    try {
      await createBugBoard({ sentObj });
      //dispatch results here or in query endpoint
    } catch (e) {
      console.log("something went wrong");
      console.log(e);
    }
  };

  const inviteToWorkspaceFunc = async () => {
    let sentObj = {
      user: text.inviteUser,
      workspace: server,
    };
    try {
      let req = await InviteWorkspaceMember({ sentObj });
      console.log(req);
    } catch (e) {
      console.log("errror thrown in inviteToWorkspaceFunc");
      console.log(e);
    }
  };

  //delete bug func

  const deleteBugFunc = async (workspace: string, bug: string) => {
    let sentObj = {
      workspace,
      bug,
    };

    try {
      let req = await DeleteBug({ sentObj });
    } catch (e) {
      console.log("error something");
      console.log(e);
    }
  };

  //edit bugTitleFunc

  const editBugTitleFunc = async (
    board: string,
    bug: string,
    method: string
  ) => {
    let sentObj = {
      board,
      bug,
      data: text.newTitle,
      method,
    };
    try {
      let req = await EditBugTitle({ sentObj });
    } catch (e) {
      console.log("error something in editBugTitle catch");
      console.log(e);
    }
  };

  //get server information here
  return (
    <div
      style={{
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      THIS IS THE SERVER PAGE OF SERVER:
      <span style={{ backgroundColor: "red", maxWidth: "250px" }}>
        {server}
      </span>
      <br />
      <div>
        <h1>Invite another user to this server</h1>
        <input
          placeholder="user's email"
          value={text.inviteUser}
          onChange={handleChange}
          name="inviteUser"
        />
        <button onClick={inviteToWorkspaceFunc}>Invite user</button>
      </div>
      <br />
      <br />
      <button style={{ maxWidth: "150px" }} onClick={createNewBugBoardFunc}>
        Create New Board
      </button>
      <input
        placeholder="board name"
        style={{ maxWidth: "150px" }}
        value={text.boardName}
        onChange={handleChange}
        name="boardName"
      />
      <div>
        Here are your boards:
        {/* <button onClick={() => createNewBug({ sentObj })}>
          create new bug
        </button> */}
        <h1>MY BUG BOARDS</h1>;
        {data?.boards.map((board: any, index1: number) => {
          let sentObj = {
            board: board._id,
            title: text.title,
            description: text.description,
          };

          return (
            <div key={index1}>
              <p>{board.name}</p>
              <p>{board.workspace}</p>
              <div>
                <h1>Bugs in {board.name}</h1>
                {board?.bugs?.map((bug: any, index2: number) => {
                  return (
                    <div
                      key={index2}
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "80vw",
                      }}
                    >
                      {/* <p>A bug</p> */}
                      <div>
                        <button
                          onClick={() =>
                            editBugTitleFunc(board._id, bug._id, "title")
                          }
                        >
                          Edit Title
                        </button>
                        <input
                          placeholder="edit title"
                          value={text.newTitle}
                          onChange={handleChange}
                          name="newTitle"
                        />
                        <p>{bug.title}</p>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            editBugTitleFunc(board._id, bug._id, "description")
                          }
                        >
                          Edit Title
                        </button>
                        <input
                          placeholder="edit title"
                          value={text.newTitle}
                          onChange={handleChange}
                          name="newTitle"
                        />
                        <p>{bug.description}</p>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            editBugTitleFunc(board._id, bug._id, "status")
                          }
                        >
                          Edit Status
                        </button>
                        <input
                          placeholder="edit status"
                          value={text.newTitle}
                          onChange={handleChange}
                          name="newTitle"
                        />
                        <p>{bug.status}</p>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            editBugTitleFunc(board._id, bug._id, "urgency")
                          }
                        >
                          Edit Urgency
                        </button>
                        <input
                          placeholder="edit urgency"
                          value={text.newTitle}
                          onChange={handleChange}
                          name="newTitle"
                        />
                        <p>{bug.urgency}</p>
                      </div>

                      <p>{bug.assigned ? bug.assigned : "unassigned"}</p>
                      <p>{bug.assigned ? bug.assigned : "assigned by"}</p>
                      <button onClick={() => deleteBugFunc(board._id, bug._id)}>
                        Delete bug
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => createNewBug({ sentObj })}>
                Create New Bug
              </button>
              <input
                placeholder="bug title"
                style={{ maxWidth: "150px" }}
                value={text.title}
                onChange={handleChange}
                name="title"
              />
              <input
                placeholder="bug description"
                style={{ maxWidth: "150px" }}
                value={text.description}
                onChange={handleChange}
                name="description"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
