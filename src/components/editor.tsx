import Sprit from "./sprite";
import ActionDialog from "./actions";
import AddSprit from "./add-sprit";
import { useMainStore } from "@/store/main";

export default function Editor() {
  const { sprits } = useMainStore();
  return (
    <div className="flex flex-col gap-4 h-[91vh] pr-2 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Sprit Editor</h3>
        <AddSprit />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {sprits.map((s) => (
          <Sprit id={s.id} key={s.id} />
        ))}
      </div>
      <ActionDialog />
    </div>
  );
}
