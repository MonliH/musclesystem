import create from "zustand";

type PageState = {
  pageProgress: number;
  setPageProgress: (pageProgress: number) => void;
};
const usePage = create<PageState>((set) => ({
  pageProgress: 0,
  setPageProgress: (pageProgress: number) => {
    set({ pageProgress });
  },
}));

export default usePage;
