import create from "zustand";

export enum JointType {
  Immovable,
  BallAndSocket,
  Condyloid,
  Plane,
  Saddle,
  Hinge,
  Pivot,
}
type JointTypeState = {
  type: JointType;
  setType: (type: JointType) => void;
};

const useJointType = create<JointTypeState>((set) => ({
  type: JointType.Hinge,
  setType: (type: JointType) => set({ type }),
}));
export default useJointType;
