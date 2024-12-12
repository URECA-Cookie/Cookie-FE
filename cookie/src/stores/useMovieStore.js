import { create } from "zustand";
import axiosInstance from "../api/auth/axiosInstance";
import toast from "react-hot-toast";

const useMovieStore = create((set) => ({
  registeredMovies: [],
  totalPages: 0,
  loading: false,
  currentPage: 1,

  fetchMovies: async (currentPage) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/api/admin/movies/${currentPage}`
      );
      set({
        registeredMovies: response.data.response.results,
        totalPages: response.data.response.totalPages,
      });
    } catch (error) {
      console.error("영화 목록을 불러오는 데 실패했습니다.", error);
    } finally {
      set({ loading: false });
    }
  },

  searchMovies: async (searchKeyword) => {
    if (!searchKeyword.trim()) {
      toast.error("검색어가 비어 있습니다.");
      return;
    }

    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/api/admin/movies/${searchKeyword}/1`
      );
      set({
        registeredMovies: response.data.response.results,
      });
    } catch (error) {
      console.error("영화 검색 실패", error);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useMovieStore;
