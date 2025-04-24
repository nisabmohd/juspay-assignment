import { BadgePlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMainStore } from "@/store/main";
import { spriteSize } from "@/lib/utils";

const elementId = "plane-rect";

export default function Sprit({ id }: { id: string }) {
  const { sprits, updateState } = useMainStore();
  const currentSprit = sprits.find((it) => it.id == id);
  if (!currentSprit) return null;

  function handleAddAction() {
    updateState({
      actionModalOpen: true,
      actionItemSelectedForModalId: id,
    });
  }

  function handleRemove() {
    updateState({ sprits: sprits.filter((it) => it.id != id) });
  }

  return (
    <div className="border rounded-2xl px-2 py-2 pb-4 flex flex-col gap-5 relative shadow-lg">
      <div className="grid grid-cols-1 justify-between ">
        <img
          className="w-28 h-32 py-1.5 mx-auto"
          src={currentSprit.image}
          alt={currentSprit.name}
        />
        <div className="flex flex-col gap-2 pt-2 col-span-2">
          <Input
            placeholder="Sprite name"
            value={currentSprit.name}
            onChange={(e) => {
              const currentSpritUpdated = {
                ...currentSprit,
                name: e.target.value,
              };

              updateState({
                sprits: sprits.map((s) =>
                  s.id == id ? currentSpritUpdated : s
                ),
              });
            }}
          />
          <div className="grid grid-cols-2 gap-2 ">
            <Input
              type="number"
              placeholder="X"
              value={currentSprit.curentPosition.x}
              onChange={(e) => {
                const newX = e.target.valueAsNumber;
                const container = document.getElementById(elementId);
                if (!container) return;

                const rect = container.getBoundingClientRect();
                const clampedX = Math.max(
                  0,
                  Math.min(rect.width - spriteSize, newX)
                );

                const currentSpritUpdated = {
                  ...currentSprit,
                  curentPosition: {
                    ...currentSprit.curentPosition,
                    x: clampedX,
                  },
                };

                updateState({
                  sprits: sprits.map((s) =>
                    s.id == id ? currentSpritUpdated : s
                  ),
                });
              }}
            />
            <Input
              type="number"
              placeholder="Y"
              value={currentSprit.curentPosition.y}
              onChange={(e) => {
                const newY = e.target.valueAsNumber;
                const container = document.getElementById(elementId);
                if (!container) return;

                const rect = container.getBoundingClientRect();
                const clampedY = Math.max(
                  0,
                  Math.min(rect.height - spriteSize, newY)
                );

                const currentSpritUpdated = {
                  ...currentSprit,
                  curentPosition: {
                    ...currentSprit.curentPosition,
                    y: clampedY,
                  },
                };

                updateState({
                  sprits: sprits.map((s) =>
                    s.id == id ? currentSpritUpdated : s
                  ),
                });
              }}
            />
          </div>
          <Button onClick={handleAddAction}>
            <BadgePlusIcon />
            Add Actions
          </Button>
        </div>
      </div>

      <Button
        onClick={handleRemove}
        variant="secondary"
        className="absolute top-1 right-1 size-6"
      >
        <XCircleIcon className="text-destructive" />
      </Button>
    </div>
  );
}
