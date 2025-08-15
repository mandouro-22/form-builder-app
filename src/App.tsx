import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Root } from "./routes/__root";
import { LayoutTemplate } from "./routes/template/layout";
import { Template } from "./routes/template/template";
import { LayoutLanding } from "./routes/landing/layout";
import { BuildingLayout } from "./routes/building/layout";
import { Building } from "./routes/building/builder";
import { AuthLayout } from "./routes/auth/layout";
import { SignUp } from "./routes/auth/sign-up";
import { Login } from "./routes/auth/login";

const routeTree = Root.addChildren([
  LayoutLanding,
  LayoutTemplate.addChildren([Template]),
  BuildingLayout.addChildren([Building]),
  AuthLayout.addChildren([SignUp, Login]),
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
