import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Root = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 !geist-regular">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
