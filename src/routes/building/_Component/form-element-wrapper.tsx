import { memo } from "react";
import { type FormElement } from "../../../store/store";

interface Props {
  id: string;
  type: string;
  name: string;
  label: string;
  is_required: boolean;
  active: string | null;
  children: React.ReactNode;
  setActive: (value: string | null) => void;
  ButtonAction: (type: string, id: string) => React.ReactNode;
  selectElementFN?: React.MouseEventHandler<HTMLDivElement>;
  removeElementFN?: React.MouseEventHandler<HTMLDivElement>;
  selectedElement: FormElement | null;
}

export const FormElementWrapper = memo(
  ({
    children,
    type,
    active,
    setActive,
    ButtonAction,
    name,
    label,
    id,
    is_required,
    selectElementFN,
    selectedElement,
  }: Props) => {
    return (
      <div
        key={type}
        className={`my-3 rounded-lg px-4 py-2 shadow-md relative border border-gray-200 transition-all duration-300
                     ${
                       selectedElement && selectedElement.id === id
                         ? "ring-2 ring-cyan-700 bg-cyan-700/10"
                         : "bg-gray-100/50"
                     }
        `}
        onMouseEnter={() => setActive(type)}
        onMouseLeave={() => setActive(null)}
        onClick={selectElementFN}>
        {active === type ? ButtonAction(type, id) : null}
        <div className="flex items-center gap-2">
          <label
            htmlFor={name || id}
            className="font-semibold text-lg text-gray-900">
            {label}
          </label>
          {is_required ? <span className="text-red-600 text-sm">*</span> : null}
        </div>
        {children}
      </div>
    );
  }
);
