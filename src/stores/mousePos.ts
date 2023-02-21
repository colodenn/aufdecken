import { create } from "zustand"

type Position = {
    x: number,
    y: number
}
interface MousePositon {
    pos: Position,
    updateMousePosition: (pos: Position) => void
}

export const useMousePositionStore = create<MousePositon>()((set) => ({
    pos: {x: 0, y:0},
    updateMousePosition: (pos: Position) => set(() => ({ pos: pos })),
  }))