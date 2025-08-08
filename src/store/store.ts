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
  addElement: (element: FormElement) => void;
}

export const useFormStore = create<FormBuilder>((set) => ({
  elements: [],

  addElement(element: FormElement) {
    const data: FormElement = {
      ...element,
      id: Date.now().toString(36).substring(2, 9),
    };

    set((state) => ({
      elements: [...state.elements, data],
    }));
  },
}));
