import { type FormElement } from "../../../store/store";
import { FormElementWrapper } from "./form-element-wrapper";

type RenderElementsProps = {
  elements: FormElement[];
  active: string | null;
  setActive: (value: string | null) => void;
  ButtonAction: (value: string, id: string) => React.ReactNode;
  selectedElement: FormElement | null;
  selectElement: (element: FormElement | null) => void;
};

export const RenderElements = ({
  elements,
  active,
  setActive,
  ButtonAction,
  selectedElement,
  selectElement,
}: RenderElementsProps) => {
  return (
    <>
      {elements.map((e) => {
        switch (e.type) {
          case "input":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                name={e.name}
                label={e.label}
                is_required={e.is_required}
                type={e.type}
                active={active}
                selectElementFN={() => selectElement(e)}
                selectedElement={selectedElement}
                ButtonAction={ButtonAction}
                setActive={setActive}>
                <div className="mt-2">
                  <input
                    type="text"
                    className="input py-2 px-4 w-full disabled:cursor-not-allowed"
                    placeholder={e.placeholder}
                    name={e.name}
                    required={!!e.is_required}
                    disabled
                  />
                </div>
              </FormElementWrapper>
            );

          case "textarea":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                name={e.name}
                label={e.label}
                is_required={e.is_required}
                type={e.type}
                active={active}
                selectElementFN={() => selectElement(e)}
                ButtonAction={ButtonAction}
                selectedElement={selectedElement}
                setActive={setActive}>
                <div className="mt-2">
                  <textarea
                    className="input py-2 px-4 w-full disabled:cursor-not-allowed"
                    placeholder={e.placeholder}
                    name={e.name}
                    required={!!e.is_required}
                    disabled
                  />
                </div>
              </FormElementWrapper>
            );

          case "checkbox":
          case "radio":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                selectedElement={selectedElement}
                name={e.name}
                label={e.label}
                is_required={e.is_required}
                type={e.type}
                active={active}
                selectElementFN={() => selectElement(e)}
                ButtonAction={ButtonAction}
                setActive={setActive}>
                {e.options?.map((opt) => (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type={e.type}
                      className="w-5 h-5 disabled:cursor-not-allowed"
                      name={e.name}
                      required={!!e.is_required}
                      disabled
                    />
                    <span className="text-gray-700">{opt}</span>
                  </div>
                ))}
              </FormElementWrapper>
            );

          case "select":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                name={e.name}
                label={e.label}
                is_required={e.is_required}
                type={e.type}
                selectElementFN={() => selectElement(e)}
                selectedElement={selectedElement}
                active={active}
                ButtonAction={ButtonAction}
                setActive={setActive}>
                <div className="mt-2">
                  <select
                    className="input py-2 px-4 w-full disabled:cursor-not-allowed"
                    name={e.name}
                    required={!!e.is_required}
                    disabled>
                    {e.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </FormElementWrapper>
            );

          case "date":
          case "email":
          case "number":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                name={e.name}
                label={e.label}
                selectElementFN={() => selectElement(e)}
                selectedElement={selectedElement}
                is_required={e.is_required}
                type={e.type}
                active={active}
                ButtonAction={ButtonAction}
                setActive={setActive}>
                <div className="mt-2">
                  <input
                    type={e.type}
                    className="input py-2 px-4 w-full disabled:cursor-not-allowed"
                    placeholder={e.placeholder}
                    name={e.name}
                    required={!!e.is_required}
                    disabled
                  />
                </div>
              </FormElementWrapper>
            );

          case "button":
            return (
              <FormElementWrapper
                id={e.id || ""}
                key={e.name}
                name={e.name}
                label=""
                selectElementFN={() => selectElement(e)}
                selectedElement={selectedElement}
                is_required={false}
                type={e.type}
                active={active}
                ButtonAction={ButtonAction}
                setActive={setActive}>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 w-fit"
                  disabled>
                  {e.label}
                </button>
              </FormElementWrapper>
            );

          default:
            return null;
        }
      })}
    </>
  );
};
