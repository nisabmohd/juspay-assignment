import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomId(length = 12): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export function getRandomPoints(boundX: number, boundY: number): Point {
  return {
    x: Math.random() * 2 * boundX - boundX,
    y: Math.random() * 2 * boundY - boundY,
  };
}

export type ActionCallback = (ref: HTMLImageElement) => void;

export type ActionLike = "rotate" | "move" | "label" | "repeat";

export type Action = {
  name: string;
  perform?: ActionCallback;
  type: ActionLike;
  id: string;
};

export type Point = {
  x: number;
  y: number;
};

export type EachSprit = {
  id: string;
  initialPosition: Point;
  curentPosition: Point;
  name: string;
  actions: Action[];
  image: string;
  rotatedDirection?: 360 | 180 | 90;
  message?: string;
};

export const preset_actions = [
  {
    id: "45wgs",
    name: "Move X by +50",
    type: "move",
  },
  {
    id: "234dsf",
    name: "Move X by -50",
    type: "move",
  },
  {
    id: "4kjc3",
    name: "Move Y by +50",
    type: "move",
  },
  {
    id: "wer345",
    name: "Move Y by -50",
    type: "move",
  },
  {
    id: "aqw345",
    name: "Move to random X,Y",
    type: "move",
  },
  {
    id: "sdku98",
    name: "Say Hello",
    type: "label",
  },
  {
    id: "wa3436",
    name: "Say Bye",
    type: "label",
  },
  {
    id: "8695vb3",
    name: "Rotate 360°",
    type: "rotate",
  },
  {
    id: "12353fd",
    name: "Rotate 180°",
    type: "rotate",
  },
  {
    id: "34ccsdv",
    name: "Repeat",
    type: "repeat",
  },
] as const satisfies Action[];

export const initial_sprits: EachSprit[] = [
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F%E2%80%94Pngtree%E2%80%94basketball%20ball%20illustration_8792111.png?alt=media&token=b1c86835-86cc-4949-90e7-22fdcf3bce8a",
    "Basketball"
  ),
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fvecteezy_black-and-white-soccer-ball-cutout-on-transparent-background_49400456.png?alt=media&token=d8cc3f2a-9d86-4628-af87-51260da56cb5",
    "Football"
  ),
];

export function createSpirit(image: string, name: string): EachSprit {
  return {
    id: getRandomId(),
    name,
    image,
    initialPosition: { x: 0, y: 0 },
    curentPosition: { x: 0, y: 0 },
    actions: [],
  };
}

export function allPerformed(indexes: number[], sprits: EachSprit[]) {
  for (let i = 0; i < sprits.length; i++) {
    const actionIndex = indexes[i];
    const len = sprits[i].actions.length;
    if (actionIndex < len) return false;
  }
  return true;
}
