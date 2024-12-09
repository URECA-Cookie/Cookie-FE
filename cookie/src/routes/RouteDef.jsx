import PrivateRoute from "./PrivateRoute";
import Main from "../pages/main";
import Search from "../pages/search";
import MovieDetail from "../pages/MovieDetail";
import Login from "../pages/Login";
import SignUpProfile from "../pages/SignUpProfile";
import SignUpGenre from "../pages/SignUpGenre";
import MyPage from "../pages/mypage";
import ManageProfile from "../pages/ManageProfile";
import LikedMovies from "../pages/LikedMovies";
import LikedReviews from "../pages/LikedReviews";
import DetailReview from "../pages/DetailReview";
import MatchupPage from "../pages/MatchupPage";
import ReTokenPage from "../api/auth/ReTokenPage";
import AdminLogin from "../pages/admin/AdminLogin";
// import Review from "../pages/Review";
import ReviewFeed from "../pages/ReviewFeed";
import ReviewForm from "../pages/ReviewForm";
import SearchForReview from "../pages/SearchForReview";
import MovieReviewForm from "../pages/MovieReviewForm";
import MovieReviewFeed from "../pages/MovieReviewFeed";
import ReviewDetail from "../pages/ReviewDetail";
import AdminMovie from "../pages/admin/AdminMovie";
import CastDetail from "../components/movieDetailPage/CastDetail";
import ErrorPage from "../pages/ErrorPage";
import MyAllReviewList from "../pages/MyAllReviewList";
import SpecialCategoryMovie from "../pages/SpecialCategoryMovie";

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
  ReviewFeed: {
    path: "/review",
    element: (
      <PrivateRoute>
        <ReviewFeed />
      </PrivateRoute>
    ),
  },

  ErrorPage: {
    path: "/*",
    element: (
      <PrivateRoute>
        <ErrorPage />
      </PrivateRoute>
    ),
  },

  myAllReviewList: {
    path: "/myAllReviewList",
    element: (
      <PrivateRoute>
        <MyAllReviewList />
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
    path: "/sign-up-genre",
    element: (
      <PrivateRoute>
        <SignUpGenre />
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
    path: "/matchup/:matchUpId",
    element: (
      <PrivateRoute>
        <MatchupPage />
      </PrivateRoute>
    ),
  },

  LoginToken: {
    path: "/retrieve-token",
    element: (
      <PrivateRoute>
        <ReTokenPage />
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

  AdminLogin: {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminLogin />
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

  MovieReviewFeed: {
    path: "/reviews/movie/:movieId",
    element: (
      <PrivateRoute>
        <MovieReviewFeed />
      </PrivateRoute>
    ),
  },

  ReviewDetails: {
    path: "/reviews/:reviewId",
    element: (
      <PrivateRoute>
        <ReviewDetail />
      </PrivateRoute>
    ),
  },

  AdminAddMovie: {
    path: "/admin/movie",
    element: (
      <PrivateRoute>
        <AdminMovie />
      </PrivateRoute>
    ),
  },
  actorDetail: {
    path: "/movie/actor/:id",
    element: (
      <PrivateRoute>
        <CastDetail />
      </PrivateRoute>
    ),
  },
  directorDetail: {
    path: "/movie/director/:id",
    element: (
      <PrivateRoute>
        <CastDetail />
      </PrivateRoute>
    ),
  },
  specialCategoryMovie: {
    path: "/special/category/movies",
    element: (
      <PrivateRoute>
        <SpecialCategoryMovie />
      </PrivateRoute>
    ),
  },
};
