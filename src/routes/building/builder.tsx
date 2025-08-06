import { createRoute } from "@tanstack/react-router";
import { BuildingLayout } from "./layout";
import {
  Type,
  AlignLeft,
  CheckSquare,
  Circle,
  ChevronDown,
  Calendar,
  Mail,
  MousePointer,
} from "lucide-react";

const formElements = [
  { id: "input", label: "Text Input", icon: Type },
  { id: "textarea", label: "Text Area", icon: AlignLeft },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare },
  { id: "radio", label: "Radio Group", icon: Circle },
  { id: "select", label: "Select", icon: ChevronDown },
  { id: "date", label: "Date Picker", icon: Calendar },
  { id: "email", label: "Email", icon: Mail },
  { id: "button", label: "Button", icon: MousePointer },
];

export const Building = createRoute({
  getParentRoute: () => BuildingLayout,
  path: "/",
  component: Page,
});

function Page() {
  return (
    <div className="bg-white" style={{ height: "calc(100vh - 58px)" }}>
      <div className="flex items-center h-full">
        <div className="w-64 border-r border-gray-200 h-full p-4">
          <div className="rounded-lg border border-gray-300 shadow p-6 bg-gray-100/50">
            <div className="mb-6">
              <h1 className="text-lg text-start font-medium">Form Element</h1>
            </div>

            <ul className="flex flex-col items-center gap-y-4">
              {formElements.map((item) => (
                <li
                  key={item.id}
                  className="w-40 mx-auto flex items-center justify-center gap-3 p-3 bg-white border border-gray-300 rounded-lg cursor-grab hover:shadow-md transition-shadow">
                  <item.icon className="h-5 w-5 text-gray-600" />
                  <p className="text-sm font-medium">{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 h-full p-6 overflow-auto">
          <div className="border-2 border-dashed border-gray-300 min-h-full overflow-auto p-6 rounded-xl">
            <div className="flex items-center flex-col justify-center gap-y-2 h-64 text-gray-500">
              <h1 className="font-semibold text-lg">Drop form elements here</h1>
              <p className="text-sm">
                Drag elements from the sidebar to start building your form
              </p>
            </div>
          </div>
        </div>
        <div className="w-80 border-l border-gray-200 h-full p-4">
          <div className="rounded-lg border border-gray-300 shadow p-6 flex flex-col gap-y-4 bg-gray-100/50">
            <h1 className="font-medium text-xl">Properties</h1>
            <p className="text-sm text-gray-600">
              Select an element to edit its properties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
