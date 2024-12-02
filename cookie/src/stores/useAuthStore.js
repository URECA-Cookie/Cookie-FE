import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoginModalOpen: false,

  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),

  isLogined: (successPath) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("[sessionStorage] : accessToken이 없습니다.");
      set({ isLoginModalOpen: true });
      return false;
    } else {
      console.log("[sessionStorage] : accessToken 확인");
      if (successPath && successPath !== "chkSuccess") {
        window.location.href = successPath;
      }
      return true;
    }
  },
}));

export default useAuthStore;
