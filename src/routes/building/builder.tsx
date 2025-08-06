import { createRoute } from "@tanstack/react-router";
import { BuildingLayout } from "./layout";

export const Building = createRoute({
  getParentRoute: () => BuildingLayout,
  path: "/",
  component: Page,
});

function Page() {
  return <div>This builder page</div>;
}
