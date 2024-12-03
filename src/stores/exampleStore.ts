import { create } from 'zustand';

// Define the interface for the store state
interface AppState {
  voiceOver: boolean;
  toggleVoiceOver: () => void;
  startVoiceOver: () => void;
  stopVoiceOver: () => void;
}

// Create the Zustand store
const useVoiceOverStore = create<AppState>((set) => ({
  voiceOver: false,

  // Toggle the voice over state
  toggleVoiceOver: () => set((state) => ({ voiceOver: !state.voiceOver })),

  // Start voice over
  startVoiceOver: () => set({ voiceOver: true }),

  // Stop voice over
  stopVoiceOver: () => set({ voiceOver: false })
}));

export default useVoiceOverStore;