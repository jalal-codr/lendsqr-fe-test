import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/_error.module.scss";

const ErrorPage = () => {
  const error = useRouteError(); 
  const navigate = useNavigate();

  let errorMessage = "An unexpected error occurred.";
  let statusCode = "Oops!";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    errorMessage = error.statusText || error.data?.message || "Page not found";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={styles.errorContainer}>
      <h1>{statusCode}</h1>
      <p>{errorMessage}</p>
      <button onClick={() => navigate("/")}>Back to Safety</button>
    </div>
  );
};

export default ErrorPage;