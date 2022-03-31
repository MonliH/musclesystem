import create from "zustand";

const useMuscle = create((set) => ({
  tricepStrength: 69,
  bicepStrength: 600,
  mass: 1,
  setTricep: (s: number) => set({ tricepStrength: s }),
  setBicep: (s: number) => set({ bicepStrength: s }),
  setMass: (s: number) => set({ mass: s }),
}));
export default useMuscle;
