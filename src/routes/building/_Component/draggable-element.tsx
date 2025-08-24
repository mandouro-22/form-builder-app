import { useDraggable } from "@dnd-kit/core";
import type { LucideProps } from "lucide-react";

interface Element {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">> &
    React.RefAttributes<SVGSVGElement>;
}

interface Props {
  formElements: Element[];
}

const FormElement = ({ id, icon: Icon, label }: Element) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      key={id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-40 mr-auto flex items-center select-none justify-start gap-3 p-3 bg-white border-2 ${
        transform ? "border-blue-600" : "border-gray-300"
      } rounded-lg cursor-grab hover:shadow-md transition-shadow`}>
      <Icon className="h-5 w-5 text-gray-600" />
      <p className="text-sm font-medium">{label}</p>
    </li>
  );
};

export default function DraggableElement({ formElements }: Props) {
  return (
    <ul className="flex flex-col items-center gap-y-4">
      {formElements.map((item) => (
        <FormElement
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </ul>
  );
}
