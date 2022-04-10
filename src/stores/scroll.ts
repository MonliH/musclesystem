import create from "zustand";

type ShowScroll = {
  showScroll: boolean;
  setScroll: (value: boolean) => void;
};

const useScroll = create<ShowScroll>((set) => ({
  showScroll: true,
  setScroll: (show: boolean) => set({ showScroll: show }),
}));
export default useScroll;
