import { createRoute, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";
import Navbar from "./_Component/navbar";

export const LayoutTemplate = createRoute({
  getParentRoute: () => Root,
  path: "/template",
  component: () => {
    return (
      <>
        <Navbar templateLength={0} />
        <Outlet />
      </>
    );
  },
});
