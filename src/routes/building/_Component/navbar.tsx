import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  DownloadIcon,
  EyeIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
  UploadIcon,
  X,
} from "lucide-react";
import { useFormStore } from "../../../store/store";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const templateSchema = z.object({
  templateName: z
    .string()
    .min(3, "Template name must be at least 3 characters"),
  description: z.string().optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface SaveTemplateModelProps {
  onClose: () => void;
  mode: "create" | "update";
}

function SaveOrUpdateTemplateModel({ onClose, mode }: SaveTemplateModelProps) {
  const { addTemplate, clearElements, currentTemp, updateTemp } =
    useFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateName: mode === "update" ? currentTemp?.templateName : "",
      description: mode === "update" ? currentTemp?.description || "" : "",
    },
  });

  const onSubmit = async (data: TemplateFormData) => {
    try {
      if (mode === "create") {
        await addTemplate(data.templateName, data.description);
      } else if (mode === "update") {
        updateTemp(
          data.templateName,
          data.description || "",
          currentTemp?.templateId || ""
        );
      }

      clearElements();

      reset();
      onClose();
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div
        className="bg-white rounded-lg w-full max-w-md p-6 mx-4 relative"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 cursor-pointer"
          aria-label="Close">
          <X />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 pr-6">
          Save Template
        </h2>
        <p className="text-gray-600 mb-6">
          Save your form as a reusable template
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="templateName"
              className="block text-sm font-medium text-gray-700 mb-1">
              Template Name <span className="text-red-500">*</span>
            </label>
            <input
              id="templateName"
              {...register("templateName")}
              className={`input w-full px-3 py-2 border ${
                errors.templateName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
              placeholder="Enter template name"
              disabled={isSubmitting}
            />
            {errors.templateName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.templateName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className={`input w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm`}
              placeholder="Enter a brief description of this template"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button px-4 py-2 text-sm font-medium bg-cyan-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting
                ? mode === "create"
                  ? "Saving..."
                  : "Updating..."
                : mode === "create"
                ? "Save Template"
                : "Update Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Navbar() {
  const {
    clearElements,
    setProperties,
    elements,
    addPreview,
    isEditTemp,
    exportAsJSON,
  } = useFormStore();
  const [open, setOpen] = useState(false);
  const setting = [
    {
      id: 1,
      name: "Properties",
      icon: <SettingsIcon className="size-4" />,
    },
    {
      id: 2,
      name: "Preview",
      icon: <EyeIcon className="size-4" />,
    },
    {
      id: 3,
      name: isEditTemp ? "Update" : "Save",
      icon: <SaveIcon className="size-4" />,
    },
    {
      id: 4,
      name: "Export",
      icon: <DownloadIcon className="size-4" />,
    },
    {
      id: 5,
      name: "Import",
      icon: <UploadIcon className="size-4" />,
    },
    {
      id: 6,
      name: "Clear",
      icon: <TrashIcon className="size-4" />,
    },
  ];

  const { importAsJSON } = useFormStore();

  const handleExportJSON = () => {
    const jsonString = exportAsJSON();
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `form-template-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.error("No file selected");
      return;
    }
    if (!file.type.includes("json")) {
      console.error("Please select a JSON file");
      return;
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json === "string") {
        importAsJSON(json);
      }
    };

    reader.readAsText(file);
  };

  const handleItemClick = (id: number) => {
    switch (id) {
      case 1:
        setProperties();
        break;
      case 2:
        addPreview(elements);
        break;
      case 3:
        setOpen(true);
        break;
      case 4:
        handleExportJSON();
        break;
      case 6:
        clearElements();
        break;
      default:
        break;
    }
  };

  return (
    <nav className="bg-white shadow-sm flex items-center flex-1 w-full border-b border-gray-200">
      <div className="w-full px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <Link
            to="/"
            className="btn hidden text-sm bg-transparent hover:bg-gray-100 text-gray-900 font-semibold sm:flex items-center">
            <ArrowLeft className="h-4" />
            <span>Back</span>
          </Link>

          <div className="mr-4">
            <h1 className="font-semibold text-xl">Form Template</h1>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs text-gray-900 font-medium">
            <span>{elements.length}</span>
            <p>element</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {setting.map((item) =>
            item.name === "Import" ? (
              <div
                key={item.id}
                className={`flex items-center gap-2 cursor-pointer`}>
                {item.icon}
                <label
                  htmlFor={String(item.id)}
                  className="text-base cursor-pointer">
                  {item.name}
                </label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImportJSON}
                  id={String(item.id)}
                />
              </div>
            ) : (
              <div
                key={String(item.id)}
                className={`flex items-center gap-2 cursor-pointer ${
                  item.id === 6 ? "text-red-600 font-medium" : null
                }`}
                onClick={() => handleItemClick(item.id)}>
                {item.icon}
                <h4 className="text-base ">{item.name}</h4>
              </div>
            )
          )}
        </div>
      </div>

      {open ? (
        <SaveOrUpdateTemplateModel
          onClose={() => setOpen(false)}
          mode={isEditTemp ? "update" : "create"}
        />
      ) : null}
    </nav>
  );
}
