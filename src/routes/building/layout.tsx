import { createRoute, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";

export const BuildingLayout = createRoute({
  getParentRoute: () => Root,
  path: "/building",
  component: () => (
    <>
      <div>navbar builder</div>
      <Outlet />
    </>
  ),
});
