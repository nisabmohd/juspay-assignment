import { allPerformed, getRandomPoints } from "@/lib/utils";
import { useMainStore } from "@/store/main";
import { useEffect, useRef } from "react";

export default function Plane() {
  const { isPlaying, currentActionIndexes, sprits, updateState } =
    useMainStore();

  const boxRef = useRef<HTMLDivElement | null>(null);

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

      if (!action) return;
      if (action.type == "repeat") {
        indices[i] = 0;
        s.curentPosition = {
          x: s.initialPosition.x,
          y: s.initialPosition.y,
        };
        s.message = undefined;
        s.rotatedDirection = undefined;
        return;
      }

      if (action.type == "label") {
        s.message = action.message;
        s.rotatedDirection = undefined;
      }

      if (action.type == "rotate") {
        s.rotatedDirection = action.degree;
        s.message = undefined;
      }

      if (action.type == "move") {
        if (action.dir) {
          s.curentPosition = {
            x: action.dir.x
              ? s.curentPosition.x + action.dir.x
              : s.curentPosition.x,
            y: action.dir.y
              ? s.curentPosition.y + action.dir.y
              : s.curentPosition.y,
          };
        } else {
          const rect = boxRef.current?.getBoundingClientRect();
          if (!rect) return;
          const boundX = rect.width / 2;
          const boundY = rect.height / 2;
          s.curentPosition = getRandomPoints(boundX, boundY);
          s.message = undefined;
          s.rotatedDirection = undefined;
        }
      }

      indices[i]++;
    });

    setTimeout(() => {
      updateState({ currentActionIndexes: indices, sprits });
    }, 500);
    //
  }, [isPlaying, currentActionIndexes, sprits, updateState]);

  return (
    <div
      ref={boxRef}
      className="border h-[91vh] rounded-2xl flex shadow-lg relative"
    >
      {sprits.map((s) => (
        <div
          key={s.id}
          className="absolute transition-all duration-1000 ease-in-out cursor-grab"
          style={{
            left: s.curentPosition.x,
            top: s.curentPosition.y,
          }}
        >
          <div className="relative w-28 h-28">
            {s.message && (
              <div className="absolute top-0 left-1/2 text-sm transform -translate-x-1/2 text-white bg-black px-2 py-1 rounded-md z-10">
                {s.message}
              </div>
            )}

            <img
              draggable
              className="w-28 h-28 absolute transition-transform duration-300 ease-in-out"
              style={{
                transform: `rotate(${s.rotatedDirection ?? 0}deg)`,
              }}
              src={s.image}
              alt={s.name}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
