import { FormInput } from "lucide-react";
import AuthBtn from "../../../components/auth-btn";

export default function Navbar() {
  const token = sessionStorage.getItem("token");
  return (
    <nav className="bg-white shadow-sm flex items-center flex-1 w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FormInput className="text-cyan-700 size-8" />
          <h1 className="font-bold text-2xl">FormCraft</h1>
        </div>
        <div className="flex items-center gap-3">
          <AuthBtn status={token ? "out" : "sign"} />
        </div>
      </div>
    </nav>
  );
}
