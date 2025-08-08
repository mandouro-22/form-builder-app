interface Props {
  type: string;
  name: string;
  label: string;
  is_required: boolean;
  active: string | null;
  children: React.ReactNode;
  setActive: (value: string | null) => void;
  ButtonAction: (value: string) => React.ReactNode;
}

export const FormElementWrapper = ({
  children,
  type,
  active,
  setActive,
  ButtonAction,
  name,
  label,
  is_required,
}: Props) => {
  return (
    <div
      key={type}
      className="bg-gray-100/50 my-3 rounded-lg px-4 py-2 shadow-md relative border border-gray-200 transition-all duration-300"
      onMouseEnter={() => setActive(type)}
      onMouseLeave={() => setActive(null)}>
      {active === type ? ButtonAction(type) : null}
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="font-semibold text-lg text-gray-900">
          {label}
        </label>
        {is_required ? <span className="text-red-600 text-sm">*</span> : null}
      </div>
      {children}
    </div>
  );
};
