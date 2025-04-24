import { PawPrintIcon } from "lucide-react";

export default function Logo() {
  return (
    <h3 className="font-semibold text-xl flex items-center gap-2 px-1">
      <PawPrintIcon className="text-sky-600 font-semibold" size={25} />
      Scratch
    </h3>
  );
}
