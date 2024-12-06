import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoginModalOpen: false,
  isLoggedIn: false,

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
      set({ isLoggedIn: true });
      return true;
    }
  },

  logIn: () => {
    set({ isLoggedIn: true });
    console.log("로그인 상태가 설정되었습니다.");
  },
  logOut: () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ isLoggedIn: false });
    console.log("로그아웃 되었습니다.");
  },
}));

export default useAuthStore;
