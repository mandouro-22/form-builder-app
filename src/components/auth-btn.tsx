import { Link } from "@tanstack/react-router";

export default function AuthBtn() {
  return (
    <Link
      to="/auth/login"
      className="btn ring-1 ring-cyan-600 text-cyan-800 font-medium">
      Sign in
    </Link>
  );
}
