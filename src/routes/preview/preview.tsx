import { useFormStore, type FormElement } from "../../store/store";
import { useForm } from "react-hook-form";

type FormInputs = {
  [key: string]: string | string[];
};

const FormElement = ({ element }: { element: FormElement }) => {
  const {
    register,
    formState: { errors },
  } = useForm<FormInputs>();
  const name = element.id || "";
  const isRequired = element.is_required || false;

  const commonProps = {
    ...register(name, { required: isRequired }),
    className: `input py-1.5 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
      errors[name] ? "border-red-500" : ""
    }`,
    id: name,
  };

  const renderElement = () => {
    switch (element.type) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={3}
            placeholder={element.placeholder}
            className={`${commonProps.className} resize-none`}
          />
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {element.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${name}-${index}`}
                  value={option}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`${name}-${index}`}
                  className="ml-2 block text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {element.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`${name}-${index}`}
                  value={option}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`${name}-${index}`}
                  className="ml-2 block text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );

      case "select":
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {element.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "button":
        return (
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 rounded-b-lg">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              disabled>
              Submit
            </button>
          </div>
        );

      default:
        return (
          <input
            type={element.type === "email" ? "email" : "text"}
            {...commonProps}
            placeholder={element.placeholder}
          />
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1">
        {element.label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderElement()}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">This field is required</p>
      )}
    </div>
  );
};

export default function Preview() {
  const { preview } = useFormStore();
  console.log(preview);
  if (!Array.isArray(preview) || preview.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-58px)] bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No form elements
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add elements to your form to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-58px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Form Preview
          </h1>
          <p className="text-gray-600">
            This is how your form will look to users
          </p>
        </div>

        <form className="space-y-6">
          {preview.map((element, index) => (
            <FormElement key={element.id || index} element={element} />
          ))}
        </form>
      </div>
    </div>
  );
}
