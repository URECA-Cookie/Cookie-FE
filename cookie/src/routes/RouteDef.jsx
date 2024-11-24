import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";
import Search from "../pages/search";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import SignUpProfile from "../pages/SignUpProfile";
import SignUpTheme from "../pages/SignUpTheme";
import MyPage from "../pages/mypage";
import ManageProfile from "../pages/ManageProfile";
import LikedMovies from "../pages/LikedMovies";
import LikedReviews from "../pages/LikedRevies";
import DetailReview from "../pages/DetailReview";
import MatchupPage from "../pages/MatchupPage";
import ReviewForm from "../pages/ReviewForm";
import SearchForReview from "../pages/SearchForReview";
import MovieReviewForm from "../pages/MovieReviewForm";

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

  ManageProfile: {
    path: "/manageprofile",
    element: (
      <PrivateRoute>
        <ManageProfile />
      </PrivateRoute>
    ),
  },

  LikedMovies: {
    path: "/likemovies",
    element: (
      <PrivateRoute>
        <LikedMovies />
      </PrivateRoute>
    ),
  },

  LikedReviews: {
    path: "/likereviews",
    element: (
      <PrivateRoute>
        <LikedReviews />
      </PrivateRoute>
    ),
  },

  DetailReviews: {
    path: "/detailreview",
    element: (
      <PrivateRoute>
        <DetailReview />
      </PrivateRoute>
    ),
  },

  MatchUp: {
    path: "/matchup",
    element: (
      <PrivateRoute>
        <MatchupPage />
      </PrivateRoute>
    ),
  },
  MatchUpHistory: {
    path: "/matchup/:matchUpId/history",
    element: (
      <PrivateRoute>
        <MatchupPage />
      </PrivateRoute>
    ),
  },
  ReviewForm: {
    path: "/reviews/write",
    element: (
      <PrivateRoute>
        <ReviewForm />
      </PrivateRoute>
    ),
  },
  SearchForReview: {
    path: "/searchmov",
    element: (
      <PrivateRoute>
        <SearchForReview />
      </PrivateRoute>
    ),
  },
  MovieReviewForm: {
    path: "/movie/:movieId/review",
    element: (
      <PrivateRoute>
        <MovieReviewForm />
      </PrivateRoute>
    ),
  },
};
