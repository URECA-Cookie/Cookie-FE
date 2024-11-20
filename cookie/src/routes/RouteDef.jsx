import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";
import Search from "../pages/search";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import SignUpProfile from "../pages/SignUpProfile";
import SignUpTheme from "../pages/SignUpTheme";
import MyPage from "../pages/mypage";

export const AppRouteDef = {
  Main: {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
  Search: {
    path: "/search",
    element: (
      <PrivateRoute>
        <Search />
      </PrivateRoute>
    ),
  },
  MovieDetail: {
    path: "/movie/:id", // 동적 라우팅
    element: (
      <PrivateRoute>
        <MovieDetail />
      </PrivateRoute>
    ),
  },
  Login: {
    path: "/login",
    element: (
      <PrivateRoute>
        <Login />
      </PrivateRoute>
    ),
  },
  SignUp: {
    path: "/sign-up-profile",
    element: (
      <PrivateRoute>
        <SignUpProfile />
      </PrivateRoute>
    ),
  },
  SignUpTag: {
    path: "/sign-up-theme",
    element: (
      <PrivateRoute>
        <SignUpTheme />
      </PrivateRoute>
    ),
  },
  MyPage: {
    path: "/mypage",
    element: (
      <PrivateRoute>
        <MyPage />
      </PrivateRoute>
    ),
  },
};
