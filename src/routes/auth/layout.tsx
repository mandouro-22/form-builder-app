import { createRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";

export const AuthLayout = createRoute({
  getParentRoute: () => Root,
  path: "/auth",
  component: () => {
    const token = sessionStorage.getItem("token");
    if (token) return <Navigate to="/" />;

    return <Outlet />;
  },
});
