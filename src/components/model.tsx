import { X } from "lucide-react";

interface Props {
  title: string;
  content: string;
  isClose: () => void;
  onDelete: () => void;
}

export default function Model({ title, content, isClose, onDelete }: Props) {
  return (
    <>
      <div
        className="fixed bg-black/40 min-w-dvw h-screen left-0 top-0 right-0 bottom-0 backdrop-blur-xs"
        onClick={isClose}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-1/2 w-[600px] bg-white rounded-lg px-4 py-8"
        onClick={(e) => e.stopPropagation()}>
        <div
          className="absolute right-4 top-5 w-7 h-7 border-2 border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:[&>svg]:text-gray-600 hover:border-gray-400 transition-all duration-150"
          onClick={isClose}>
          <X className="size-4 text-gray-700" />
        </div>
        <div className="flex items-start flex-col gap-3 mb-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="max-w-md text-gray-600 font-medium">{content}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn border border-gray-300"
            onClick={isClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn bg-red-500 text-white font-semibold"
            onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
