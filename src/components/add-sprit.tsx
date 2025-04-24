import { PlusIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { createSpirit, getRandomId } from "@/lib/utils";
import { useMainStore } from "@/store/main";

export default function AddSprit() {
  const { sprits, updateState } = useMainStore();

  return (
    <div>
      <input
        type="file"
        id="add-sprit"
        hidden
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            const asUrl = URL.createObjectURL(file);
            const allSprits = [...sprits, createSpirit(asUrl, getRandomId(6))];
            updateState({ sprits: allSprits });
          }
        }}
      />
      <label htmlFor="add-sprit" className={buttonVariants()}>
        <PlusIcon />
        Add
      </label>
    </div>
  );
}
