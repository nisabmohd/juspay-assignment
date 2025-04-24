import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useMainStore } from "@/store/main";

export default function Play() {
  const { updateState } = useMainStore();

  function handlePlayStart() {
    updateState({ isPlaying: true, currentActionIndex: 0 });
  }

  return (
    <Button onClick={handlePlayStart}>
      <PlayIcon />
      Play
    </Button>
  );
}
