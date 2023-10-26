import { FC } from "react";
import { useRouteError } from "react-router-dom";

interface ErrorPageInterface {
  statusText: string;
  message: string;
}

const ErrorPage: FC = function () {
  const error: ErrorPageInterface = useRouteError() as ErrorPageInterface;
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
};

export default ErrorPage;
