import { createRouter } from "@tanstack/react-router";
import { LayoutLanding } from "./landing/layout";
import { LayoutPreview } from "./preview/layout";
import { BuildingLayout } from "./building/layout";
import { AuthLayout } from "./auth/layout";
import { Root } from "./__root";
import { Template } from "./template/template";
import { Building } from "./building/builder";
import { SignUp } from "./auth/sign-up";
import { Login } from "./auth/login";
import { LayoutTemplate } from "./template/layout";

const routeTree = Root.addChildren([
  LayoutLanding,
  LayoutPreview,
  LayoutTemplate.addChildren([Template]),
  BuildingLayout.addChildren([Building]),
  AuthLayout.addChildren([SignUp, Login]),
]);
export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
