import { create } from "zustand";

export interface FormElement {
  id?: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
  placeholder: string;
  is_required: boolean;
  label: string;
  type: string;
  options?: string[];
  position_canva?: number;
  // | "input"
  // | "textarea"
  // | "checkbox"
  // | "radio"
  // | "select"
  // | "date"
  // | "email"
  // | "button";
}

interface FormBuilder {
  elements: FormElement[];
  is_preview: boolean;
  selectedElement: FormElement | null;
  addElement: (element: FormElement) => void;
  selectElement: (element: FormElement | null) => void;
  removeElement: (id: string) => void;
  clearElements: () => void;
  setProperties: () => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
}

export const useFormStore = create<FormBuilder>((set, get) => ({
  elements: [],
  selectedElement: null,
  is_preview: true,

  addElement(element) {
    const data: FormElement = {
      ...element,
      id: Date.now().toString(36).substring(2, 9),
    };

    set((state) => ({
      elements: [...state.elements, data],
    }));
  },

  selectElement(element) {
    if (element && element.id === "") return;
    const filterElement = get().elements.find(
      (item) => item.id === element?.id
    );

    set({
      selectedElement: filterElement,
    });
  },

  removeElement(id) {
    if (!id) return;
    const remove = get().elements.filter((item) => item.id !== id);

    set({
      elements: remove,
      selectedElement: null,
    });
  },

  clearElements() {
    set({
      elements: [],
      selectedElement: null,
    });
  },

  setProperties() {
    set((state) => ({
      is_preview: !state.is_preview,
    }));
  },

  updateElement(id, updates) {
    set((state) => {
      const isSelected = state.selectedElement?.id === id;
      return {
        elements: state.elements.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
        selectedElement: isSelected
          ? { ...state.selectedElement!, ...updates }
          : state.selectedElement,
      };
    });
  },
}));
