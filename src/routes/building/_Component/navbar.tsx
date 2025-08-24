import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  DownloadIcon,
  EyeIcon,
  Menu,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
  UploadIcon,
  X,
} from "lucide-react";
import { useFormStore } from "../../../store/store";
import { useCallback, useState } from "react";
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
        className="bg-white rounded-lg w-[90%] sm:w-full sm:max-w-md p-6 mx-4 relative"
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
    importAsJSON,
    closeEditTemp,
  } = useFormStore();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleExportJSON = useCallback(() => {
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
  }, [exportAsJSON]);

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

  const handleItemClick = useCallback(
    (id: number) => {
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
          closeEditTemp();
          break;
        default:
          break;
      }
    },
    [
      addPreview,
      clearElements,
      elements,
      handleExportJSON,
      setProperties,
      closeEditTemp,
    ]
  );

  return (
    <nav className="bg-white shadow-sm w-full border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="font-semibold text-lg sm:text-xl">
                Form Template
              </h1>
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:items-center space-x-4">
              <Link
                to="/"
                onClick={() => {
                  clearElements();
                  closeEditTemp();
                }}
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Link>
              <div className="flex items-center text-sm text-gray-700">
                <span className="font-medium">{elements.length}</span>
                <span className="ml-1">
                  element{elements.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {setting.map((item) =>
              item.name === "Import" ? (
                <div
                  key={item.id}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md cursor-pointer">
                  {item.icon}
                  <label
                    htmlFor={String(item.id)}
                    className="ml-2 cursor-pointer">
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
                  className={`flex items-center text-sm px-3 py-2 rounded-md cursor-pointer ${
                    item.id === 6
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => handleItemClick(item.id)}>
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </div>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden transition-all duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="flex items-center px-3 py-2 text-sm text-gray-700">
              <span className="font-medium">
                {elements.length} element{elements.length !== 1 ? "s" : ""}
              </span>
            </div>
            {setting.map((item) =>
              item.name === "Import" ? (
                <div
                  key={item.id}
                  className="flex items-center px-3 py-2 text-base text-gray-700 hover:bg-gray-100 rounded-md">
                  {item.icon}
                  <label
                    htmlFor={`mobile-${item.id}`}
                    className="ml-3 cursor-pointer">
                    {item.name}
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImportJSON}
                    id={`mobile-${item.id}`}
                  />
                </div>
              ) : (
                <div
                  key={String(item.id)}
                  className={`flex items-center px-3 py-2 text-base rounded-md ${
                    item.id === 6
                      ? "text-red-600 hover:bg-red-50"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => {
                    handleItemClick(item.id);
                    setMobileMenuOpen(false);
                  }}>
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {open ? (
        <SaveOrUpdateTemplateModel
          onClose={() => setOpen(false)}
          mode={isEditTemp ? "update" : "create"}
        />
      ) : null}
    </nav>
  );
}
