import { RotateCcwIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMainStore } from "@/store/main";

export default function Reset() {
  const { sprits, updateState } = useMainStore();

  function handleResetPosition() {
    const orignalSprits = sprits.map((s) => ({
      ...s,
      curentPosition: s.initialPosition,
    }));

    updateState({
      isPlaying: false,
      currentActionIndexes: undefined,
      sprits: orignalSprits,
    });
  }

  return (
    <Button onClick={handleResetPosition}>
      <RotateCcwIcon />
      Reset
    </Button>
  );
}
