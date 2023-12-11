import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="empty-product">
      <h1>Page Not Found</h1>
      <Link to="/">
        <h2>Goto Home Page</h2>
      </Link>
    </div>
  );
};

export default ErrorPage;
