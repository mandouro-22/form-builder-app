import { createRoute } from "@tanstack/react-router";
import { LayoutTemplate } from "./layout";

export const Template = createRoute({
  getParentRoute: () => LayoutTemplate,
  path: "/",
  component: () => <div className="">welcome to template page</div>,
});
