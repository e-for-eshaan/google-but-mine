import { create } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
  imageDropVisible: boolean;
  showImageDrop: () => void;
  hideImageDrop: () => void;
}

const appStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  imageDropVisible: false,
  showImageDrop: () => set((state) => ({ imageDropVisible: !state.showImageDrop })),
  hideImageDrop: () => set({ imageDropVisible: false }),
}));

export default appStore;