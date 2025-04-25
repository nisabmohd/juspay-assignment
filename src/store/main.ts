import { EachSprit } from "@/lib/utils";
import { create } from "zustand";

type State = {
  isPlaying: boolean;
  actionModalOpen: boolean;
  actionItemSelectedForModalId: string | undefined;
  sprits: EachSprit[];
  currentActionIndexes: number[] | undefined;
};

type Action = {
  updateState: (data: Partial<State>) => void;
};

export const useMainStore = create<State & Action>((set) => ({
  isPlaying: false,
  actionModalOpen: false,
  actionItemSelectedForModalId: undefined,
  sprits: [],
  currentActionIndexes: undefined,
  updateState: (data) => set((prev) => ({ ...prev, ...data })),
}));
