import { Link } from "@tanstack/react-router";
import { ArrowLeft, DownloadIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm flex items-center flex-1 w-full border-b border-gray-200">
      <div className="w-full px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <Link
            to="/building"
            className="btn hidden text-sm bg-transparent hover:bg-gray-100 text-gray-900 font-semibold sm:flex items-center">
            <ArrowLeft className="h-4" />
            <span>Back to builder</span>
          </Link>

          <div className="mr-4">
            <h1 className="font-semibold text-xl">Form Preview</h1>
          </div>
        </div>

        <button className="flex items-center gap-4 btn border border-gray-200 bg-white">
          <DownloadIcon className="size-4" />
          <span className="text-sm font-medium">Export PDF</span>
        </button>
      </div>
    </nav>
  );
}
