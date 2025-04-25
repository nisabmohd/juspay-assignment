import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMainStore } from "@/store/main";
import { getNextSprit } from "@/lib/utils";
import { useMemo } from "react";

export default function AddSprit() {
  const { updateState, isPlaying, sprits } = useMainStore();

  function handleAdd() {
    const s = getNextSprit(sprits.map((it) => it.name));
    if (s)
      updateState({
        sprits: [...sprits, s],
      });
  }

  const haveNextSprit = useMemo(
    () => !!getNextSprit(sprits.map((it) => it.name)),
    [sprits]
  );

  return (
    <Button disabled={!haveNextSprit || isPlaying} onClick={handleAdd}>
      <PlusIcon />
      Add
    </Button>
  );
}
