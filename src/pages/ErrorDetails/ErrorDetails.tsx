import { useRouteError } from 'react-router-dom';

export function ErrorDetails() {
  const error = useRouteError();

  let errorComponent = 'An unknown error occured. This message should not show.';
  if (error instanceof Error) {
    errorComponent = error.message;
  } else if (error instanceof Response) {
    errorComponent = error.statusText;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        <i>{errorComponent}</i>
      </p>
    </div>
  );
}
