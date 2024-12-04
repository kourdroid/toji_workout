import { create } from 'zustand';

const useTimerStore = create((set, get) => ({
  time: 0,
  isRunning: false,
  workTime: 30,
  restTime: 10,
  currentRound: 1,
  totalRounds: 3,
  isWork: true,
  customPresets: [],
  
  setTime: (time) => set({ time }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setWorkTime: (workTime) => set({ workTime }),
  setRestTime: (restTime) => set({ restTime }),
  setCurrentRound: (currentRound) => set({ currentRound }),
  setTotalRounds: (totalRounds) => set({ totalRounds }),
  setIsWork: (isWork) => set({ isWork }),
  setCustomPresets: (customPresets) => set({ customPresets }),

  startTimer: () => {
    const state = get();
    if (state.time === 0) {
      set({ 
        time: state.workTime,
        isWork: true,
        currentRound: 1,
        isRunning: true
      });
    } else {
      set({ isRunning: true });
    }
  },

  pauseTimer: () => {
    set({ isRunning: false });
  },

  resetTimer: () => {
    set({
      isRunning: false,
      time: 0,
      currentRound: 1,
      isWork: true
    });
  },

  tickTimer: () => {
    const state = get();
    if (state.time === 0) {
      if (state.isWork) {
        if (state.currentRound === state.totalRounds) {
          set({ isRunning: false });
          return;
        }
        set({
          isWork: false,
          time: state.restTime
        });
      } else {
        set({
          isWork: true,
          currentRound: state.currentRound + 1,
          time: state.workTime
        });
      }
    } else {
      set({ time: state.time - 1 });
    }
  },

  applyPreset: (preset) => {
    set({
      workTime: preset.work,
      restTime: preset.rest,
      totalRounds: preset.rounds,
      isRunning: false,
      time: 0,
      currentRound: 1,
      isWork: true
    });
  },

  addCustomPreset: (preset) => {
    const state = get();
    set({ customPresets: [...state.customPresets, preset] });
  }
}));

export default useTimerStore;
