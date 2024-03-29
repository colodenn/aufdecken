import { create } from "zustand"


interface Settingsbar {
    settingsBarOpen: boolean,
    toggleSettingsBar: (toggle: boolean) => void
}

export const useSettingsbarStore = create<Settingsbar>()((set) => ({
    settingsBarOpen: false,
    toggleSettingsBar:  (toggle) => set(() => ({ settingsBarOpen: toggle })),
  }))