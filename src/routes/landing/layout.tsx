import { createRoute } from "@tanstack/react-router";
import { Root } from "../__root";
import Landing from "./landing";
import Navbar from "./_Component/navbar";

export const LayoutLanding = createRoute({
  getParentRoute: () => Root,
  path: "/",
  component: () => {
    return (
      <>
        <Navbar />
        <Landing />
      </>
    );
  },
});
