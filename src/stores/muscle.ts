import create from "zustand";

const useMuscle = create((set) => ({
  tricepStrength: 40,
  bicepStrength: 500,
  mass: 4,
  setTricep: (s: number) => set({ tricepStrength: s }),
  setBicep: (s: number) => set({ bicepStrength: s }),
  setMass: (s: number) => set({ mass: s }),
}));
export default useMuscle;
