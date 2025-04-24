import { allPerformed } from "@/lib/utils";
import { useMainStore } from "@/store/main";
import { useEffect } from "react";

export default function Plane() {
  const { isPlaying, currentActionIndex, sprits, updateState } = useMainStore();

  useEffect(() => {
    if (!isPlaying) return;

    if (allPerformed(currentActionIndex, sprits)) {
      updateState({ isPlaying: false, currentActionIndex: 0 });
      return;
    }

    sprits.forEach((s) => {
      const act = s.actions[currentActionIndex];
      if (!act) return;
      console.log(s.name, act);
    });

    updateState({ currentActionIndex: currentActionIndex + 1 });
    //
  }, [isPlaying, currentActionIndex, sprits, updateState]);

  return (
    <div className="border h-[91vh] grow rounded-2xl flex shadow-lg relative">
      {sprits.map((s) => (
        <img key={s.id} className="w-28 h-28" src={s.image} alt={s.name} />
      ))}
    </div>
  );
}
