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
    x: Math.round(Math.random() * boundX),
    y: Math.round(Math.random() * boundY),
  };
}

type MoveAction = {
  type: "move";
  dir: null | {
    x?: number;
    y?: number;
  };
};

type LableAction = {
  type: "label";
  message: string;
};

type RepeatAction = {
  type: "repeat";
};

type RotateAction = {
  type: "rotate";
  degree: number;
};

export type Action = {
  name: string;
  id: string;
} & (RotateAction | RepeatAction | LableAction | MoveAction);

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
  rotatedDirection?: number;
  message?: string;
};

export const preset_actions = [
  {
    id: "45wgs",
    name: "Move X by +50",
    type: "move",
    dir: {
      x: 50,
    },
  },
  {
    id: "234dsf",
    name: "Move X by -50",
    type: "move",
    dir: {
      x: -50,
    },
  },
  {
    id: "4kjc3",
    name: "Move Y by +50",
    type: "move",
    dir: {
      y: 50,
    },
  },
  {
    id: "wer345",
    name: "Move Y by -50",
    type: "move",
    dir: {
      y: -50,
    },
  },
  {
    id: "aqw345",
    name: "Move to random X,Y",
    type: "move",
    dir: null,
  },
  {
    id: "sdku98",
    name: "Say Hello",
    type: "label",
    message: "Hello",
  },
  {
    id: "wa3436",
    name: "Say Bye",
    type: "label",
    message: "Bye",
  },
  {
    id: "8695vb3",
    name: "Rotate 360°",
    type: "rotate",
    degree: 360,
  },
  {
    id: "12353fd",
    name: "Rotate 180°",
    type: "rotate",
    degree: 180,
  },
  {
    id: "34ccsdv",
    name: "Repeat",
    type: "repeat",
  },
] as const satisfies Action[];

const preset_sprits = [
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F%E2%80%94Pngtree%E2%80%94basketball%20ball%20illustration_8792111.png?alt=media&token=b1c86835-86cc-4949-90e7-22fdcf3bce8a",
    "Basketball",
    {
      x: 0,
      y: 0,
    }
  ),
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fmikasa-sports-beach-volleyball-mikasa-mva-200-volleyball-8ca4f5fa937137e132d6b3ba44bc1ad8.png?alt=media&token=bb382cf3-feeb-4ff9-ae19-7eb6d243feac",
    "Volleyball",
    {
      x: 20,
      y: 20,
    }
  ),
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fvecteezy_black-and-white-soccer-ball-cutout-on-transparent-background_49400456.png?alt=media&token=fe82f589-9912-4c0e-8d01-11b65fa5cd81",
    "Football",
    {
      x: 50,
      y: 50,
    }
  ),
  createSpirit(
    "https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2Fpngimg.com%20-%20baseball_PNG19024.png?alt=media&token=d50a627f-e976-4833-b22f-73e3d94cc97f",
    "Baseball",
    {
      x: 90,
      y: 110,
    }
  ),
];

export function getNextSprit(alreadyThere: string[]) {
  if (alreadyThere.length == preset_sprits.length) return undefined;
  return preset_sprits.filter((it) => !alreadyThere.includes(it.name))?.[0];
}

export function createSpirit(
  image: string,
  name: string,
  pos?: Point
): EachSprit {
  return {
    id: getRandomId(),
    name,
    image,
    initialPosition: pos ?? { x: 0, y: 0 },
    curentPosition: pos ?? { x: 0, y: 0 },
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

export const spriteSize = 112;
