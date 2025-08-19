import { createRoute, Navigate, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";
import Navbar from "./_Component/navbar";

export const LayoutTemplate = createRoute({
  getParentRoute: () => Root,
  path: "/template",
  component: () => {
    const token = sessionStorage.getItem("token");
    if (!token) return <Navigate to="/auth/login" />;

    return (
      <>
        <Navbar templateLength={0} />
        <Outlet />
      </>
    );
  },
});
