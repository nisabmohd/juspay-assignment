import { EachObject, initial_sprits } from "@/lib/utils";
import { create } from "zustand";

type State = {
  isPlaying: boolean;
  actionModalOpen: boolean;
  currentActionItemId: string | undefined;
  sprits: EachObject[];
  currentActionIndex: number;
};

type Action = {
  updateState: (data: Partial<State>) => void;
};

export const useMainStore = create<State & Action>((set) => ({
  isPlaying: false,
  actionModalOpen: false,
  currentActionItemId: undefined,
  sprits: initial_sprits,
  currentActionIndex: 0,
  updateState: (data) => set((prev) => ({ ...prev, ...data })),
}));
