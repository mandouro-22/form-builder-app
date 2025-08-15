import { useEffect, useState } from "react";
import { useFormStore, type FormElement } from "../../../store/store";
import { PlusIcon, X } from "lucide-react";

interface Props {
  selectElement: FormElement;
}
export default function PropertiePanel({ selectElement }: Props) {
  const { updateElement } = useFormStore();
  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState(selectElement);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeFields = (field: string, value: any) => {
    const newData = {
      ...data,
      [field]: value,
    };

    setData(newData);
    updateElement(newData.id!, newData);
  };

  const handleGenerateOptions = () => {
    if (!data.options) return;

    const newOption = [
      ...(data.options || []),
      `Option ${data.options.length + 1}`,
    ];
    handleChangeFields("options", newOption);
  };

  const handleUpdateOption = (index: number, value: string) => {
    const option = [...(data.options || [])];
    option[index] = value;
    handleChangeFields("options", option);
  };
  const removeOption = (id: number) => {
    const filterOption = data.options?.filter((_, i) => i !== id);
    handleChangeFields("options", filterOption);
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, is_required: isOn }));
    updateElement(data.id!, { ...data, is_required: isOn });

    // i don't add (data) in dependency because happen over re-render
  }, [isOn, updateElement]);

  return (
    <div>
      <div className="flex items-center justify-between gap-8 ">
        <h1 className="font-medium text-xl">Properties</h1>
        <p className="capitalize text-xs px-4 h-6 flex items-center bg-gray-200 border border-gray-300 rounded-lg ">
          {data.type}
        </p>
      </div>

      <form className="mt-5 space-y-5 text-gray-700">
        <div className="flex flex-col gap-y-2">
          <label className="font-semibold">Label</label>
          <input
            type="text"
            className="input py-1.5 px-2.5 text-gray-800"
            name={data.name}
            value={data.label}
            onChange={(e) => handleChangeFields("label", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            className="input py-1.5 px-2.5 text-gray-800"
            name={data.name}
            value={data.name}
            onChange={(e) => handleChangeFields("name", e.target.value)}
          />
        </div>
        {["input", "textarea", "email", "select"].includes(data.type) ? (
          <div className="flex flex-col gap-y-2">
            <label className="font-semibold">Placeholder</label>
            <input
              type="text"
              className="input py-1.5 px-2.5 text-gray-800"
              name={data.name}
              value={data.placeholder}
              onChange={(e) =>
                handleChangeFields("placeholder", e.target.value)
              }
            />
          </div>
        ) : null}
        <div className="text-gray-700 flex items-center justify-between gap-2">
          <h1 className="font-medium">Is Required</h1>
          <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isOn ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={handleToggle}>
            <div
              className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                isOn ? "translate-x-6 bg-white" : "translate-x-0 bg-white"
              }`}></div>
          </div>
        </div>

        {["select", "radio", "checkbox"].includes(data.type) ? (
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold">Options</label>
              <button
                type="button"
                className="btn ring ring-gray-200"
                onClick={handleGenerateOptions}>
                <PlusIcon className="size-4 text-gray-800" />
              </button>
            </div>
            {data.options &&
              data.options.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2">
                  <input
                    type="text"
                    className="input py-1.5 px-2"
                    placeholder={`Option-${index + 1}`}
                    onChange={(e) => handleUpdateOption(index, e.target.value)}
                    value={item}
                  />
                  <button
                    type="button"
                    className="btn ring ring-gray-200"
                    onClick={() => removeOption(index)}>
                    <X className="size-4 text-red-500" />
                  </button>
                </div>
              ))}
          </div>
        ) : null}
      </form>
    </div>
  );
}
