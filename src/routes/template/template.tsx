import { createRoute, Link } from "@tanstack/react-router";
import { LayoutTemplate } from "./layout";
import {
  EyeIcon,
  PenBoxIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import Model from "../../components/model";

const templateCards = [
  {
    id: 1,
    name: "Omar Mandour",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deserunt impedit quam.",
    numOfElements: 3,
    create_at: new Date(),
  },
  {
    id: 2,
    name: "Omar Mandour",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deserunt impedit quam.",
    numOfElements: 3,
    create_at: new Date(),
  },
  {
    id: 3,
    name: "Omar Mandour",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deserunt impedit quam.",
    numOfElements: 3,
    create_at: new Date(),
  },
  {
    id: 4,
    name: "Omar Mandour",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deserunt impedit quam.",
    numOfElements: 3,
    create_at: new Date(),
  },
];

export const Template = createRoute({
  getParentRoute: () => LayoutTemplate,
  path: "/",
  component: Page,
});

function Page() {
  const [open, setOpen] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    return setOpen(null);
  }, []);

  return (
    <div
      className="bg-white py-12 px-4"
      style={{ height: "calc(100vh - 58px)" }}>
      <div className="container mx-auto">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search templates..."
            name="search"
            className="input pl-10 h-9 w-full "
          />
        </div>
        {templateCards && templateCards.length > 0 ? (
          <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 my-6">
            {templateCards.map((temp) => (
              <div
                className="border border-gray-200 shadow rounded-lg px-4 py-6"
                key={temp.id}>
                <div className="my-1">
                  <h1 className="text-lg font-semibold text-gray-900 mb-2">
                    {temp.name}
                  </h1>
                  <p className="max-w-md text-gray-600 text-sm">
                    {temp.content}
                  </p>
                </div>

                <div className="flex items-center gap-x-2 my-2">
                  <p className="bg-gray-200/50 rounded-xl px-4 text-xs py-[1px] border border-gray-400">
                    {temp.numOfElements} Elements
                  </p>
                  <p className="text-gray-700">•</p>
                  <p className="text-base text-gray-700 font-medium">
                    {temp.create_at.toLocaleDateString("EG")}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <Link
                    to="/template"
                    className="flex-1 border border-gray-300 h-7 text-gray-700 flex items-center justify-center gap-2 font-medium rounded-md py-0.5 text-sm">
                    <PenBoxIcon className="size-4" />
                    Edit
                  </Link>
                  <div className="border border-gray-300 h-7 w-8 rounded-md flex items-center justify-center">
                    <EyeIcon className="size-4" />
                  </div>
                  <div
                    onClick={() => setOpen(temp.id)}
                    className="border border-red-300 h-7 w-8 rounded-md flex items-center justify-center text-red-400 hover:border-red-500 hover:text-red-600 transition-all duration-150">
                    <TrashIcon className="size-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center flex-col w-full justify-center gap-y-4 py-20 px-4">
            <div className="flex flex-col gap-2 5 items-center">
              <h1 className="font-bold text-lg">No templates yet</h1>
              <p className="text-gray-600 text-sm">
                Create your first form template to get started
              </p>
            </div>

            <Link
              to="/building"
              className="btn text-sm bg-cyan-700 text-white font-semibold flex items-center">
              <PlusIcon className="h-4" />
              <span>Create Template</span>
            </Link>
          </div>
        )}
      </div>

      {open ? (
        <Model
          title="Delete Template"
          content="Are you sure you want to delete 'Omar Mandour'? This action cannot be undone."
          isClose={handleClose}
        />
      ) : null}
    </div>
  );
}
