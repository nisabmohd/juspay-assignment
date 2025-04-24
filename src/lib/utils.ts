import { clsx, type ClassValue } from "clsx";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomId(length = 12): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function getRandomPoints(bound: number): Point {
  console.log(bound);
  // TODO:
  return { x: Math.random(), y: Math.random() };
}
export type ActionCallback = (ref: ReactElement) => void;

export type ActionLike = "rotate" | "move" | "label";

export type Action = {
  name: string;
  action: ActionCallback;
  type: ActionLike;
  id: string;
};

export type Point = {
  x: number;
  y: number;
};

export type EachObject = {
  id: string;
  initialPosition: Point;
  curentPosition: Point;
  name: string;
  actions: Action[];
  image: string;
};

export const preset_actions = [
  {
    id: "45wgs",
    name: "Move X by 50",
    action: (ref) => {
      console.log(ref);
    },
    type: "move",
  },
  {
    id: "4kjc3",
    name: "Move Y by 50",
    action: (ref) => {
      console.log(ref);
    },
    type: "move",
  },
] as const satisfies Action[];

export const initial_sprits: EachObject[] = [
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fklipartz.com.png?alt=media&token=9cec8864-0328-44f3-8f15-b6076ff9f71f",
    "Doraemon"
  ),
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fnovita-18.png?alt=media&token=a5dd25b4-66c2-4b09-8dfa-e35a26355e9c",
    "Nobita"
  ),
];

export function createSpirit(image: string, name: string): EachObject {
  return {
    id: getRandomId(),
    name,
    image,
    initialPosition: { x: 0, y: 0 },
    curentPosition: { x: 0, y: 0 },
    actions: [],
  };
}
