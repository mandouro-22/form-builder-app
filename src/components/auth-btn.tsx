import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Loader2Icon } from "lucide-react";

interface Props {
  status: "sign" | "out";
}

export default function AuthBtn({ status }: Props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setLoading(true);
      signOut(auth).then(() => {
        navigate({
          to: "/auth/login",
        });
      });
      sessionStorage.removeItem("token");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return status === "sign" ? (
    <Link
      to="/auth/login"
      className="btn ring-1 ring-cyan-600 text-cyan-800 font-medium">
      Sign in
    </Link>
  ) : (
    <button
      type="button"
      className="btn ring-1 ring-cyan-600 text-cyan-800 font-medium"
      onClick={handleLogout}
      disabled={loading}>
      {loading ? <Loader2Icon className="size-6 animate-spin" /> : "Logout"}
    </button>
  );
}
