import { createRoute, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";
import Navbar from "./_Component/navbar";

export const BuildingLayout = createRoute({
  getParentRoute: () => Root,
  path: "/building",
  component: () => (
    <>
      <Navbar templateLength={0} />
      <Outlet />
    </>
  ),
});
