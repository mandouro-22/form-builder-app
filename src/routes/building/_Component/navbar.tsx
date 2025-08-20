import { Link, useNavigate } from "@tanstack/react-router";
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
    name: "Save",
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

interface SaveTemplateModelProps {
  onClose: () => void;
}

function SaveTemplateModel({ onClose }: SaveTemplateModelProps) {
  const { addTemplate, clearElements } = useFormStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      templateName: "",
      description: "",
    },
  });

  const onSubmit = async (data: TemplateFormData) => {
    try {
      console.log("Saving template:", data);
      await addTemplate(data.templateName, data.description);
      clearElements();
      navigate({
        to: "/template",
      });
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
              className="button px-4 py-2 text-sm cursor-pointer font-medium bg-cyan-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Saving..." : "Save Template"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { clearElements, setProperties, elements, addPreview } = useFormStore();
  const [open, setOpen] = useState(false);

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
          {setting.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 cursor-pointer ${
                item.id === 6 ? "text-red-600 font-medium" : null
              }`}
              onClick={() =>
                item.id === 6
                  ? clearElements()
                  : item.id === 1
                  ? setProperties()
                  : item.id === 2
                  ? addPreview(elements)
                  : item.id === 3
                  ? setOpen(true)
                  : null
              }>
              {item.icon}
              <h4 className="text-base ">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {open ? <SaveTemplateModel onClose={() => setOpen(false)} /> : null}
    </nav>
  );
}
