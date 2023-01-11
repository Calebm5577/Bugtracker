import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error: any = useRouteError(); /// FIX ANY TYPE LATER
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
