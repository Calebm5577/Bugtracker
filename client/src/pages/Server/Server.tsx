import React, { ChangeEvent, useState } from "react";
import {
  useGetBugsQuery,
  useCreateBugBoardMutation,
  useCreateBugMutation,
} from "../../features/api/endpoints/workspaceEndpoints";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";

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
    createBugBoard,
    {
      isError: createBugBoardError,
      isLoading: createBugBoardLoading,
      isSuccess: createBugBoardSuccess,
      data: createBugBoardData,
    },
  ] = useCreateBugBoardMutation();

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

  const createNewBug = async (workspaceParam: any) => {
    try {
      await createBug("63c00b0036f2f01d4ca0a859");
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

  //get server information here
  return (
    <div
      style={{
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
      }}
    >
      THIS IS THE SERVER PAGE OF SERVER:{" "}
      <span style={{ backgroundColor: "red", maxWidth: "250px" }}>
        {server}
      </span>
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
        <button onClick={() => createNewBug({ sentObj })}>
          create new bug
        </button>
        {/* {data?.servers.map((server: any) => {
          let sentObj = {
            server: server.workspace,
            title: text.title,
            description: text.description,
          };
          return (
            <div>
              <p>{server.name}</p>
              <p>{server.workspace}</p>
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
        })} */}
      </div>
    </div>
  );
}
