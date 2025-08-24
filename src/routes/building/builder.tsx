import {
  Type,
  AlignLeft,
  CheckSquare,
  Circle,
  ChevronDown,
  Calendar,
  Mail,
  MousePointer,
  Library,
  SettingsIcon,
} from "lucide-react";
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import DraggableElement from "./_Component/draggable-element";
import DroppableElement from "./_Component/droppable-element";
import { useCallback, useEffect, useRef, useState } from "react";
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

export const Building = () => {
  const {
    elements,
    addElement,
    is_preview,
    selectedElement,
    propertyStatus,
    setProperties,
  } = useFormStore();
  const [isActive, setIsActive] = useState<string | null>(null);
  const [openElement, setOpenElement] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
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

  const handleCloseAllPopups = useCallback(() => {
    setOpenElement(false);
    propertyStatus(false);
  }, [propertyStatus]);

  useEffect(() => {
    const updateWindow = () => {
      const newWight = window.innerWidth;

      if (newWight <= 991) {
        setOpenElement(false);
      } else if (newWight <= 767) {
        propertyStatus(false);
      }
    };
    updateWindow();
    window.addEventListener("resize", updateWindow);
    return () => {
      window.removeEventListener("resize", updateWindow);
    };
  }, [propertyStatus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleCloseAllPopups();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [handleCloseAllPopups]);

  return (
    <div
      className="bg-white relative"
      style={{ height: "calc(100vh - 58px)" }}
      ref={popupRef}>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex items-center h-full overflow-hidden">
          <div className="lg:inline-flex hidden h-full">
            <div className="w-full sm:w-64 border-r border-gray-200 h-full p-2 sm:p-4 transition-all duration-300">
              <div className="rounded-lg border border-gray-300 shadow p-4 sm:p-6 bg-gray-100/50">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-base sm:text-lg text-start font-medium">
                    Form Elements
                  </h1>
                </div>
                <DraggableElement formElements={formElements} />
              </div>
            </div>
          </div>

          {openElement && (
            <>
              <div className="rounded-lg max-lg:absolute max-lg:z-20 max-lg:top-4 max-lg:left-3 bg-white lg:border-r border-gray-200 transition-all duration-300">
                <div className="rounded-lg border border-gray-300 shadow p-4 sm:p-6 bg-gray-100/50">
                  <div className="mb-4 sm:mb-6">
                    <h1 className="text-base sm:text-lg text-start font-medium">
                      Form Elements
                    </h1>
                  </div>
                  <DraggableElement formElements={formElements} />
                </div>
              </div>
            </>
          )}

          <div
            className="lg:hidden absolute bottom-5 left-4 bg-white border border-gray-300 shadow-2xl w-11 h-11 rounded-full cursor-pointer flex items-center justify-center text-gray-700"
            onClick={() => setOpenElement(!openElement)}>
            <Library className="size-5" />
          </div>

          <DroppableElement />

          {is_preview ? (
            <>
              <div className="max-md:hidden w-80 border-l border-gray-200 h-full p-4">
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

              <div
                className="md:hidden absolute right-3 top-4 rounded-lg border border-gray-300 shadow p-6 flex flex-col gap-y-4 bg-gray-100 min-h-24"
                onClick={(e) => e.stopPropagation()}>
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
            </>
          ) : null}

          <div
            className="md:hidden absolute bottom-5 right-4 bg-white border border-gray-300 shadow-2xl w-11 h-11 rounded-full cursor-pointer flex items-center justify-center text-gray-700"
            onClick={setProperties}>
            <SettingsIcon className="size-5" />
          </div>

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
};
