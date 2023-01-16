import { is } from "immer/dist/internal";
import React from "react";
import {
  useGetNotificationsQuery,
  useAcceptOrDenyNotificatonsMutation,
} from "../../features/api/endpoints/sideBarEndpoints";

export function Home() {
  const { isLoading, isError, isSuccess, data } = useGetNotificationsQuery("");
  const [
    acceptOrDeny,
    {
      isLoading: acceptOrDenyIsLoading,
      isError: acceptOrDenyIsError,
      isSuccess: acceptOrDenyIsSuccess,
      data: acceptOrDenyIsData,
    },
  ] = useAcceptOrDenyNotificatonsMutation();

  if (isLoading) {
    console.log("is Loading in Home");
    console.log(isLoading);
  }
  if (isError) {
    console.log("is Error in Home");
    console.log(isError);
  }
  if (isSuccess) {
    console.log("is Success in Home");
    console.log(isSuccess);
  }

  if (data) {
    console.log(`data in Home ${JSON.stringify(JSON.stringify(data))}`);
    console.log(data);
  }

  if (acceptOrDenyIsLoading) {
    console.log("is Loading acceptOrDeny in Home");
    console.log(acceptOrDenyIsLoading);
  }
  if (acceptOrDenyIsError) {
    console.log("is Error acceptOrDeny in Home");
    console.log(acceptOrDenyIsError);
  }
  if (acceptOrDenyIsSuccess) {
    console.log("is Success acceptOrDeny in Home");
    console.log(acceptOrDenyIsSuccess);
  }

  if (acceptOrDenyIsData) {
    console.log(
      `acceptOrDeny data in Home ${JSON.stringify(JSON.stringify(data))}`
    );
    console.log(acceptOrDenyIsData);
  }

  const acceptOrDenyFunc = async (bool: string, notification: any) => {
    let sentObj = {
      bool,
      ...notification,
    };
    try {
      let req: any = await acceptOrDeny(sentObj).unwrap();
      console.log("req in acceptOrDeny");
      console.log(req);
      //   console.log(req?.error.message);
    } catch (e) {
      console.log("acceptOrDenyFunc cought error:");
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h1>Charts and stuff</h1>
      </div>
      <div>
        <h1>Assigned Tasks from all workspaces</h1>
      </div>
      <div>
        <h1>Notifications for Workspace invites</h1>
        {data?.getUserNotification.map((invite: any) => {
          console.log("invite");
          console.log(invite);
          return (
            <div style={{ border: "1px solid red" }}>
              <h1>
                Invited by: {invite.sentBy.firstName} {invite.sentBy.lastName}
              </h1>
              <h1>To join the workspace: {invite.workspace.name}</h1>
              <div>
                <button onClick={() => acceptOrDenyFunc("true", invite)}>
                  Accept
                </button>
                <button onClick={() => acceptOrDenyFunc("false", invite)}>
                  Deny
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
