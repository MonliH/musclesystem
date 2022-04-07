import create from "zustand";

export enum JointPart {
  Cartilage = 0,
  Ligaments = 1,
  Bursae = 2,
  Tendons = 3,
}
type JointTypeState = {
  part: JointPart;
  setPart: (type: JointPart) => void;
};

const useJointPart = create<JointTypeState>((set) => ({
  part: JointPart.Cartilage,
  setPart: (part: JointPart) => set({ part }),
}));
export default useJointPart;
