import { createRoute } from "@tanstack/react-router";
import { Root } from "../__root";
import Preview from "./preview";
import Navbar from "./_Components/navbar";

export const LayoutPreview = createRoute({
  getParentRoute: () => Root,
  path: "/preview",
  component: () => {
    return (
      <>
        <Navbar />
        <Preview />
      </>
    );
  },
});
