import { useDroppable } from "@dnd-kit/core";
import { useFormStore } from "../../../store/store";
import { Settings, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { RenderElements } from "./generate-element";

export default function DroppableElement() {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const [active, setActive] = useState<string | null>(null);

  const style = {
    color: isOver ? "green" : undefined,
  };

  const {
    elements = [],
    selectElement,
    selectedElement,
    removeElement,
    propertyStatus,
  } = useFormStore();

  const ButtonAction = (type: string, id: string) =>
    active === type ? (
      <div className="flex items-center justify-end gap-3 absolute right-4 top-1 ">
        <div
          className="border border-gray-100/60 rounded-md shadow p-2 cursor-pointer hover:shadow-lg"
          onClick={() => propertyStatus(true)}>
          <Settings className="size-4" />
        </div>
        <div
          className="border border-gray-100/60 rounded-md shadow p-2 cursor-pointer hover:shadow-lg"
          onClick={() => removeElement(id)}>
          <Trash2Icon className="size-4 text-red-600/80" />
        </div>
      </div>
    ) : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-1 h-full p-6 overflow-auto">
      <div className="border-2 border-dashed border-gray-300 min-h-full overflow-auto p-6 rounded-xl">
        {Array.isArray(elements) && elements.length > 0 ? (
          <RenderElements
            elements={elements}
            active={active}
            setActive={setActive}
            ButtonAction={ButtonAction}
            selectedElement={selectedElement}
            selectElement={selectElement}
          />
        ) : (
          // RenderElements(
          //   elements,
          //   active,
          //   setActive,
          //   ButtonAction,
          //   selectedElement,
          //   selectElement
          // )
          <div className="flex items-center flex-col justify-center gap-y-2 h-64 text-gray-500">
            <h1 className="font-semibold text-lg">Drop form elements here</h1>
            <p className="text-sm">
              Drag elements from the sidebar to start building your form
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
