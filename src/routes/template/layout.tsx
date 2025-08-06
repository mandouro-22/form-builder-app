import { createRoute, Outlet } from "@tanstack/react-router";
import { Root } from "../__root";

export const LayoutTemplate = createRoute({
  getParentRoute: () => Root,
  path: "/template",
  component: () => {
    return (
      <>
        <div className="">navbar template</div>
        <Outlet />
      </>
    );
  },
});
