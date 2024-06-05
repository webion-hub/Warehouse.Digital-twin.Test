import { WAREHOUSE_HEIGHT } from "@/data/sizes";
import { create } from "zustand";

export type Shelf = {
  readonly x: number;
  readonly y: number;
  readonly floors: { filled: boolean }[];
};

type WarehouseState = {
  readonly shelfs: Shelf[];
  readonly setShelfs: (shelfs: Shelf[]) => void;
  readonly addShelf: (x: number, y: number) => void;
  readonly removeShelf: (x: number, y: number) => void;
  readonly thereIsShelf: (x: number, y: number) => boolean;
  readonly fillShelf: (x: number, y: number, floor: number) => void;
  readonly unfillShelf: (x: number, y: number, flooer: number) => void;
};

export const useWarehouse = create<WarehouseState>((set, get) => ({
  shelfs: [],
  setShelfs: (shelfs) => set({ shelfs }),
  addShelf: (x, y) => set((state) => ({
    shelfs: [
      ...state.shelfs, 
      { 
        x, 
        y,
        floors: Array(WAREHOUSE_HEIGHT).fill({ filled: false }),  
      }
    ],
  })),
  removeShelf: (x, y) => set((state) => ({
    shelfs: state.shelfs.filter((shelf) => shelf.x !== x || shelf.y !== y),
  })),
  thereIsShelf: (x, y) => get().shelfs.some((shelf) => shelf.x === x && shelf.y === y),
  fillShelf: (x, y, floor) => set((state) => ({
    shelfs: state
      .shelfs
      .map((shelf) => {
        if (shelf.x === x && shelf.y === y) {
          shelf.floors[floor] = { filled: true };
        }

        return shelf;
      }),
  })),
  unfillShelf: (x, y, floor) => set((state) => ({
    shelfs: state
      .shelfs
      .map((shelf) => {
        if (shelf.x === x && shelf.y === y) {
          shelf.floors[floor] = { filled: false };
        }

        return shelf;
      }),
  })),
}));