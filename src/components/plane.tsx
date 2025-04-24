import { allPerformed } from "@/lib/utils";
import { useMainStore } from "@/store/main";
import { useEffect } from "react";

export default function Plane() {
  const { isPlaying, currentActionIndexes, sprits, updateState } =
    useMainStore();

  useEffect(() => {
    if (!isPlaying || !currentActionIndexes) return;

    console.log("inside effect");

    if (allPerformed(currentActionIndexes, sprits)) {
      updateState({
        isPlaying: false,
        currentActionIndexes: new Array(sprits.length).fill(0),
      });
      return;
    }

    console.log("Action started");

    const indices = [...currentActionIndexes];

    sprits.forEach((s, i) => {
      const action = s.actions[indices[i]];

      //TODO: update sprite data

      console.log(s.name, action);
      if (!action) return;
      if (action.type == "repeat") {
        indices[i] = 0;
        return;
      }
      indices[i]++;
    });

    setTimeout(() => {
      updateState({ currentActionIndexes: indices });
    }, 800);
    //
  }, [isPlaying, currentActionIndexes, sprits, updateState]);

  console.log(isPlaying);

  return (
    <div className="border h-[91vh] grow rounded-2xl flex shadow-lg relative">
      {sprits.map((s) => (
        <img
          draggable
          key={s.id}
          className="w-28 h-28"
          src={s.image}
          alt={s.name}
          style={{
            left: s.curentPosition.x,
            top: s.curentPosition.y,
          }}
        />
      ))}
    </div>
  );
}
