import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h1>Logged Out</h1>
      <Link to="/login">
        <h2>Goto Login Page</h2>
      </Link>
    </>
  );
};

export default ErrorPage;
