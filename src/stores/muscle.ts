import create from "zustand";

type MuscleState = {
  tricepStrength: number;
  bicepStrength: number;
  mass: number;
  reversedGravity: boolean;
  setTricep: (tricepStrength: number) => void;
  setBicep: (bicepStrength: number) => void;
  setMass: (mass: number) => void;
  setReversedGravity: (gravity: boolean) => void;
};

const useMuscle = create<MuscleState>((set) => ({
  tricepStrength: 0.3,
  bicepStrength: 0.4,
  mass: 1,
  reversedGravity: false,
  setTricep: (s: number) => set({ tricepStrength: s }),
  setBicep: (s: number) => set({ bicepStrength: s }),
  setMass: (s: number) => set({ mass: s }),
  setReversedGravity: (s: boolean) => set({ reversedGravity: s }),
}));
export default useMuscle;
