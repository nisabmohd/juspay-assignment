import { RotateCcwIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMainStore } from "@/store/main";

export default function Reset() {
  const { sprits, updateState } = useMainStore();

  function handleResetPosition() {
    const orignalSprits = sprits.map((s) => ({
      ...s,
      curentPosition: s.initialPosition,
      message: undefined,
      rotatedDirection: undefined,
    }));

    updateState({
      isPlaying: false,
      currentActionIndexes: undefined,
      sprits: orignalSprits,
    });

    setTimeout(() => {
      updateState({
        isPlaying: false,
        currentActionIndexes: undefined,
        sprits: orignalSprits,
      });
    }, 500);
  }

  return (
    <Button onClick={handleResetPosition}>
      <RotateCcwIcon />
      Reset
    </Button>
  );
}
