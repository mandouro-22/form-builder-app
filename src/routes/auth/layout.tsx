import { createRoute, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";

export const AuthLayout = createRoute({
  getParentRoute: () => Root,
  path: "/auth",
  component: () => <Outlet />,
});
