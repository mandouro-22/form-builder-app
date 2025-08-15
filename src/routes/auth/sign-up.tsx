import { createRoute } from "@tanstack/react-router";
import { AuthLayout } from "./layout";

export const SignUp = createRoute({
  getParentRoute: () => AuthLayout,
  path: "/sign-up",
  component: Page,
});

function Page() {
  return <div className="text-4xl">Welcome to Sign up page</div>;
}
