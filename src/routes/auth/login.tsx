import { createRoute } from "@tanstack/react-router";
import { AuthLayout } from "./layout";

export const Login = createRoute({
  getParentRoute: () => AuthLayout,
  path: "/login",
  component: Page,
});

function Page() {
  return <div className="text-4xl">Welcome to Login page</div>;
}
