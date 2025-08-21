import { createRoute, Navigate } from "@tanstack/react-router";
import { Root } from "../__root";
import Navbar from "./_Component/navbar";
import { Building } from "./builder";

export const BuildingLayout = createRoute({
  getParentRoute: () => Root,
  path: "/building",
  component: () => {
    const token = sessionStorage.getItem("token");
    if (!token) return <Navigate to="/auth/login" />;

    return (
      <>
        <Navbar />
        <Building />
      </>
    );
  },
});
