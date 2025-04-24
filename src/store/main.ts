import { EachSprit, initial_sprits } from "@/lib/utils";
import { create } from "zustand";

type State = {
  isPlaying: boolean;
  actionModalOpen: boolean;
  actionItemSelectedForModalId: string | undefined;
  sprits: EachSprit[];
  currentActionIndex: number;
};

type Action = {
  updateState: (data: Partial<State>) => void;
};

export const useMainStore = create<State & Action>((set) => ({
  isPlaying: false,
  actionModalOpen: false,
  actionItemSelectedForModalId: undefined,
  sprits: initial_sprits,
  currentActionIndex: 0,
  updateState: (data) => set((prev) => ({ ...prev, ...data })),
}));
