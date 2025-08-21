import { create } from "zustand";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { router } from "../routes/router";
import jsPDF from "jspdf";

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

export interface TempData {
  id: string;
  templateName: string;
  description: string;
  userId: string;
  elements: FormElement[];
  createdAt: string;
  templateId: string;
}

interface FormBuilder {
  elements: FormElement[];
  is_preview: boolean;
  preview: FormElement[];
  templates: TempData[];
  selectedElement: FormElement | null;
  currentTemp: TempData | null;
  isEditTemp: boolean;
  startEditTemp: () => void;
  closeEditTemp: () => void;
  selectTemplate: (templateId: string) => void;
  updateTemp: (name: string, description: string, templateId: string) => void;
  deleteTemp: (id: string) => void;
  addElement: (element: FormElement) => void;
  selectElement: (element: FormElement | null) => void;
  removeElement: (id: string) => void;
  clearElements: () => void;
  setProperties: () => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  getTemplate: (tempDate: TempData[]) => void;
  addTemplate: (name: string, description?: string) => void;
  addPreview: (element: FormElement[]) => void;
  exportAsJSON: () => string;
  importAsJSON: (json: string) => void;
  exportAsPDF: () => void;
}

export const useFormStore = create<FormBuilder>((set, get) => ({
  elements: [],
  selectedElement: null,
  currentTemp: null,
  is_preview: true,
  preview: [],
  templates: [],
  isEditTemp: false,

  startEditTemp() {
    set({
      isEditTemp: true,
    });
    router.navigate({
      to: "/building",
    });
  },

  closeEditTemp() {
    set({
      isEditTemp: false,
    });
  },

  selectTemplate(templateId) {
    const temp = get().templates.find((item) => item.templateId === templateId);

    set({
      currentTemp: temp,
      elements: temp?.elements,
    });
  },

  addElement(element) {
    const data: FormElement = {
      ...element,
      id: Date.now().toString(36).substring(2, 9),
    };

    set((state) => ({
      elements: [...state.elements, data],
    }));
  },

  addPreview(value) {
    set({
      preview: value,
    });

    router.navigate({
      to: "/preview",
    });
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

  getTemplate(tempDate) {
    set({
      templates: tempDate,
    });
  },

  async addTemplate(name, description) {
    const userId = auth.currentUser?.uid;
    const elements = get().elements;
    if (!name || !userId || !elements) return;

    const newForm = {
      id: uuidv4(),
      userId: userId,
      templateName: name,
      description: description || "",
      elements: elements,
      createdAt: new Date(),
    };

    const data = await addDoc(collection(db, "templates"), newForm);
    await updateDoc(data, { templateId: data.id }).then(() => {
      router.navigate({ to: "/template" });
    });

    return data;
  },

  async deleteTemp(id) {
    if (!id) return;
    try {
      const deleteTemplate = await deleteDoc(doc(db, "templates", id)).then(
        () => {
          set((prev) => ({
            templates: [
              ...prev.templates.filter((item) => item.templateId !== id),
            ],
          }));
        }
      );

      return deleteTemplate;
    } catch (error) {
      console.error(error);
    }
  },

  async updateTemp(name, description, templateId) {
    if (!name || !description || !templateId) return;
    const elements = get().elements;
    const temp = get().templates.map((item) =>
      item.templateId === templateId
        ? { ...item, templateName: name, description, elements: elements }
        : item
    );

    const currentValue = get().currentTemp;

    const sendData = {
      ...currentValue,
      templateName: name,
      description: description,
      elements: elements,
    };

    set({
      templates: temp,
      currentTemp: null,
      isEditTemp: false,
      elements: [],
    });

    await updateDoc(doc(db, "templates", templateId), sendData).then(() => {
      router.navigate({ to: "/template" });
    });
  },

  exportAsJSON() {
    const { elements, currentTemp } = get();
    const exportElements = elements || currentTemp?.elements || [];
    console.log(exportElements);
    // Build export data with optional template metadata
    const exportData = {
      templateName: currentTemp?.templateName || "Untitled Template",
      description: currentTemp?.description || "",
      elements: exportElements,
      exportedAt: new Date().toISOString(),
    };

    return JSON.stringify(exportData, null, 2);
  },

  importAsJSON(json) {
    try {
      const data = JSON.parse(json);
      if (data && Array.isArray(data.elements)) {
        console.log(data);
        set({
          elements: data.elements,
          currentTemp: data,
          isEditTemp: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  exportAsPDF() {
    const { preview, currentTemp } = get();
    if (preview && preview.length > 0) {
      exportFormAsPDF(preview, currentTemp?.templateName);
    }
  },
}));

export const exportFormAsPDF = (
  elements: FormElement[],
  templateName?: string
) => {
  const doc = new jsPDF();

  // Set font
  doc.setFont("helvetica");

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(templateName || "Form Template", 20, 30);

  // Add a line separator
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 40, 190, 40);

  // Reset font for content
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  let yPosition = 60;
  let fieldNumber = 1;

  elements.forEach((element) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }

    // Field number and label
    doc.setFont("helvetica", "bold");
    doc.text(`${fieldNumber}. ${element.label}`, 20, yPosition);
    yPosition += 8;

    // Field type
    doc.setFont("helvetica", "normal");
    doc.text(`Type: ${element.type}`, 20, yPosition);
    yPosition += 8;

    // Placeholder
    if (element.placeholder) {
      doc.text(`Placeholder: ${element.placeholder}`, 20, yPosition);
      yPosition += 8;
    }

    // Options for select, radio, checkbox
    if (element.options && element.options.length > 0) {
      doc.text("Options:", 20, yPosition);
      yPosition += 6;

      element.options.forEach((option) => {
        doc.text(`- ${option}`, 25, yPosition);
        yPosition += 6;
      });
    }

    // Required field indicator
    if (element.is_required) {
      doc.setFont("helvetica", "italic");
      doc.text("Required field", 20, yPosition);
      yPosition += 8;
      doc.setFont("helvetica", "normal");
    }

    // Add spacing between fields
    yPosition += 10;
    fieldNumber++;
  });

  // Save the PDF
  const fileName = templateName
    ? `${templateName.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.pdf`
    : `form_template_${Date.now()}.pdf`;

  doc.save(fileName);
};
