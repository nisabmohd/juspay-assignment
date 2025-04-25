import {
  allPerformed,
  EachSprit,
  getRandomPoints,
  spriteSize,
} from "@/lib/utils";
import { useMainStore } from "@/store/main";
import { useEffect, useRef } from "react";

export default function Plane() {
  const { isPlaying, currentActionIndexes, sprits, updateState } =
    useMainStore();

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isPlaying || !currentActionIndexes) return;

    // Hero feature
    const map = new Map<string, EachSprit[]>();
    sprits.forEach((it) => {
      const key = JSON.stringify(it.curentPosition);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    });

    [...map.values()].forEach((it) => {
      if (it.length == 2) {
        const first = it[0]!;
        const second = it[1]!;
        if (
          (first.curentPosition.x == first.initialPosition.x &&
            first.curentPosition.y == first.initialPosition.y) ||
          (second.curentPosition.x == second.initialPosition.x &&
            second.curentPosition.y == second.initialPosition.y)
        )
          return;
        [first.actions, second.actions] = [second.actions, first.actions];
        updateState({ sprits });
        return;
      }
    });

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
          const container = boxRef.current;
          if (!container) return;

          const rect = container.getBoundingClientRect();

          let newX = s.curentPosition.x + (action.dir.x || 0);
          let newY = s.curentPosition.y + (action.dir.y || 0);

          newX = Math.max(0, Math.min(rect.width - spriteSize, newX));
          newY = Math.max(0, Math.min(rect.height - spriteSize, newY));

          s.curentPosition = { x: newX, y: newY };
        } else {
          const rect = boxRef.current?.getBoundingClientRect();
          if (!rect) return;

          const boundX = rect.width - spriteSize;
          const boundY = rect.height - spriteSize;

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

  function handleImageDragOnPlane(
    e: React.DragEvent<HTMLDivElement>,
    s: EachSprit
  ) {
    if (isPlaying) return;

    const container = boxRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    let x = e.clientX - containerRect.left;
    let y = e.clientY - containerRect.top;

    x = Math.max(0, Math.min(containerRect.width - spriteSize, x));
    y = Math.max(0, Math.min(containerRect.height - spriteSize, y));

    const newPos = { x, y };

    const spritCopy = sprits.map((sc) =>
      sc.id !== s.id ? sc : { ...sc, curentPosition: newPos }
    );

    updateState({ sprits: spritCopy });
  }

  return (
    <div
      id="plane-rect"
      ref={boxRef}
      className="border h-[91vh] rounded-2xl flex shadow-lg relative"
    >
      {sprits.map((s) => (
        <div
          draggable
          onDrag={(e) => handleImageDragOnPlane(e, s)}
          onDragEnd={(e) => handleImageDragOnPlane(e, s)}
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
