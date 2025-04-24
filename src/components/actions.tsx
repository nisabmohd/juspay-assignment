import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { preset_actions } from "@/lib/utils";
import { useMainStore } from "@/store/main";
import { XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function ActionDialog() {
  const { sprits, actionItemSelectedForModalId, actionModalOpen, updateState } =
    useMainStore();

  function closeActionModal() {
    updateState({
      actionModalOpen: false,
      actionItemSelectedForModalId: undefined,
    });
  }

  const avoidDefaultDomBehavior = (e: Event) => {
    e.preventDefault();
  };

  return (
    <Dialog open={actionModalOpen}>
      <DialogContent
        onPointerDownOutside={avoidDefaultDomBehavior}
        onInteractOutside={avoidDefaultDomBehavior}
        showClose={false}
        className="min-w-[70dvw] md:h-[70vh]"
      >
        <DialogTitle className="flex justify-between items-center">
          Actions
          <Button onClick={closeActionModal}>Done</Button>
        </DialogTitle>
        <Tabs defaultValue={actionItemSelectedForModalId}>
          <TabsList className="my-4">
            {sprits.map((it) => (
              <TabsTrigger key={it.id} value={it.id}>
                {it.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {sprits.map((it) => (
            <TabsContent key={it.id} value={it.id}>
              <ActionSelector id={it.id} />
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ActionSelector({ id }: { id: string }) {
  const { sprits, updateState } = useMainStore();
  const currentSprit = sprits.find((it) => it.id == id)!;
  const [draggedActionId, setDraggedActionId] = useState<string>();

  function handleAddAction() {
    const newAction = preset_actions.find((it) => it.id == draggedActionId)!;
    if (!newAction) return;
    const currentUpdatedSprit = {
      ...currentSprit,
      actions: [...currentSprit.actions, newAction],
    };

    const updated = sprits.map((s) => (s.id != id ? s : currentUpdatedSprit));

    updateState({ sprits: updated });
    setDraggedActionId(undefined);
  }

  function handleDeleteAction(index: number) {
    const currentCopy = { ...currentSprit };
    currentCopy.actions = currentCopy.actions.filter((_, idx) => index != idx);
    const updated = sprits.map((s) => (s.id != id ? s : currentCopy));
    updateState({ sprits: updated });
  }

  return (
    <div className="grid grid-cols-2 h-[55vh] text-sm">
      <div className="border-r flex flex-col gap-2.5 px-2 pr-4 overflow-y-auto">
        {preset_actions.map((it) => (
          <div
            draggable
            id={it.id}
            onDragStart={() => setDraggedActionId(it.id)}
            className="bg-muted rounded-2xl py-3 px-4 cursor-grab"
            key={it.id}
          >
            {it.name}
          </div>
        ))}
      </div>
      <div
        className="flex flex-col gap-2.5 px-2 pl-4 overflow-y-auto"
        onDragEnterCapture={handleAddAction}
      >
        {currentSprit.actions.map((it, idx) => (
          <div
            className="bg-muted rounded-2xl py-3 px-4 flex items-center justify-between"
            key={it.id + idx}
          >
            {it.name}
            <XCircleIcon
              onClick={() => handleDeleteAction(idx)}
              className="text-destructive cursor-pointer"
              size={18}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
