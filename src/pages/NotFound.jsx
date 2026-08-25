import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function NotFound() {
  return (
    <div className="container notfound">
      <BackButton />
      <h1>404</h1>
      <p>Page not found.</p>
      <p>
        <Link to="/">Return home</Link>
      </p>
    </div>
  );
}
