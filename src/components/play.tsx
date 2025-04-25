import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMainStore } from "@/store/main";

export default function Play() {
  const { sprits, updateState, isPlaying } = useMainStore();

  function handlePlayStart() {
    updateState({
      isPlaying: true,
      currentActionIndexes: new Array(sprits.length).fill(0),
    });
  }

  return (
    <Button onClick={handlePlayStart} disabled={isPlaying}>
      <PlayIcon />
      Play
    </Button>
  );
}
