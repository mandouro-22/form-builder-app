import { Link } from "@tanstack/react-router";
import { ArrowLeft, PlusIcon } from "lucide-react";

interface Props {
  templateLength: number;
}

export default function Navbar({ templateLength = 0 }: Props) {
  return (
    <nav className="bg-white shadow-sm flex items-center flex-1 w-full border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
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

        <div className="">
          <Link
            to="/building"
            className="btn text-sm bg-cyan-700 text-white font-semibold flex items-center">
            <PlusIcon className="h-4" />
            <span>New Template</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
