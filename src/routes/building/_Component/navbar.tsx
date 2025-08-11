import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  DownloadIcon,
  EyeIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { useFormStore } from "../../../store/store";

interface Props {
  templateLength: number;
}

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

export default function Navbar({ templateLength = 0 }: Props) {
  const { clearElements, setProperties } = useFormStore();
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
            <span>{templateLength}</span>
            <p>templates</p>
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
                  : null
              }>
              {item.icon}
              <h4 className="text-base ">{item.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
