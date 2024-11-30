import { create } from 'zustand';

interface ExampleState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useExampleStore;