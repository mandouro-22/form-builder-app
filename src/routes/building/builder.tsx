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
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DraggableElement from "./_Component/draggable-element";
import DroppableElement from "./_Component/droppable-element";
import { useState } from "react";
import { useFormStore, type FormElement } from "../../store/store";
import PropertiePanel from "./_Component/propertie-panel";

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
  const { elements, addElement, is_preview, selectedElement } = useFormStore();
  const [isActive, setIsActive] = useState<string | null>(null);
  const handleDragStart = (event: DragStartEvent) => {
    setIsActive(event.active.id as string);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const elementType = active.id as string;
    const data: FormElement = {
      name: `${elementType}_${Date.now()}`,
      position: { x: 0, y: elements.length * 80 },
      placeholder: `Enter ${elementType}...`,
      label: `${elementType.charAt(0).toUpperCase() + elementType.slice(1)}`,
      is_required: false,

      type: elementType,
    };

    if (
      elementType === "radio" ||
      elementType === "select" ||
      elementType === "checkbox"
    ) {
      data.options = ["option 1", "option 2", "option 3"];
    }

    return addElement(data);
  };

  return (
    <div className="bg-white" style={{ height: "calc(100vh - 58px)" }}>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex items-center h-full overflow-hidden">
          <div className="w-64 border-r border-gray-200 h-full p-4">
            <div className="rounded-lg border border-gray-300 shadow p-6 bg-gray-100/50">
              <div className="mb-6">
                <h1 className="text-lg text-start font-medium">Form Element</h1>
              </div>

              <DraggableElement formElements={formElements} />
            </div>
          </div>

          <DroppableElement />

          {is_preview ? (
            <div className="w-80 border-l border-gray-200 h-full p-4">
              <div className="rounded-lg border border-gray-300 shadow p-6 flex flex-col gap-y-4 bg-gray-100/50">
                {selectedElement ? (
                  <PropertiePanel selectElement={selectedElement} />
                ) : (
                  <div>
                    <h1 className="font-medium text-xl">Properties</h1>
                    <p className="text-sm text-gray-600">
                      Select an element to edit its properties
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <DragOverlay>
            {isActive ? (
              <div className="bg-white border-2 border-blue-500 rounded-lg p-3 shadow-lg">
                <div className="text-sm font-medium capitalize">{isActive}</div>
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
