import { createRoute } from "@tanstack/react-router";
import { Root } from "../__root";
import Navbar from "../../components/navbar";
import Landing from "./landing";

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
