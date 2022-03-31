import create from "zustand";

const useMuscle = create((set) => ({
  tricepStrength: 0.3,
  bicepStrength: 0.4,
  mass: 1,
  setTricep: (s: number) => set({ tricepStrength: s }),
  setBicep: (s: number) => set({ bicepStrength: s }),
  setMass: (s: number) => set({ mass: s }),
}));
export default useMuscle;
