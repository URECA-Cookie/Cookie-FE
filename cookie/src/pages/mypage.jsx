import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "../components/mypage/ProfileImage";
import BadgeList from "../components/mypage/BadgeList";
import GenreChart from "../components/mypage/GenreChart";
import FavoriteList from "../components/mypage/FavoriteList";
import ReviewList from "../components/mypage/ReviewList";
import LogoutAndWithdraw from "../components/mypage/LogoutAndWithdraw";
import LoginModal from "../components/common/LoginModal";
import axiosInstance from "../api/auth/axiosInstance";
import { toast } from "react-hot-toast";
import useAuthStore from "../stores/useAuthStore";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff4b9;
  position: relative;
`;

const MypageContent = styled.div`
  background-color: #ffffff;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 180px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 80px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ReviewTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-left: 1rem;
  color: #04012d;
`;

const MoreLink = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-right: 1rem;
  color: #724b2e;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const MyPage = () => {
  const [userData, setUserData] = useState({ nickname: "", profileImage: "" });
  const [badgeData, setBadgeData] = useState([]);
  const [genreScores, setGenreScores] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const logOut = useAuthStore((state) => state.logOut);
  const isLogined = useAuthStore((state) => state.isLogined);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      if (!isLogined()) {
        openLoginModal();
        return false;
      }
      return true;
    };

    if (!checkLoginStatus()) return;

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/api/users");

        const { nickname, profileImage, badge, genreScores, reviews } =
          response.data.response;

        setUserData({ nickname, profileImage });
        setBadgeData(
          badge.map((b) => ({
            name: b.name,
            badgeImage: b.badgeImage,
            main: b.main,
          }))
        );

        const genreData = Object.entries(genreScores[0])
          .filter(([key]) => key !== "id" && key !== "userId")
          .map(([name, points]) => ({ name, points }));
        setGenreScores(genreData);

        const transformedReviews = reviews.map((review) => ({
          reviewId: review.reviewId,
          content: review.content,
          movieScore: review.movieScore,
          reviewLike: review.reviewLike,
          createdAt: review.createdAt,
          movie: {
            title: review.movie.title,
            poster: review.movie.poster,
          },
          user: {
            nickname: review.user.nickname,
            profileImage: review.user.profileImage,
          },
        }));
        setReviewData(transformedReviews);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    fetchUserData();
  }, [isLogined, openLoginModal]);

  const mainBadge = badgeData.find((badge) => badge.main) || {};
  const favoriteItems = [{ label: "좋아한 영화" }, { label: "좋아한 리뷰" }];

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      logOut();
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  const handleWithdraw = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await axiosInstance.delete("/api/users");
        toast.success("탈퇴가 완료되었습니다.");
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
      } catch (error) {
        console.error("탈퇴 요청 실패:", error);
        toast.error("탈퇴 중 문제가 발생했습니다.\n다시 시도해주세요.");
      }
    }
  };

  const handleMoreClick = () => {
    navigate("/myAllReviewList");
  };

  return (
    <>
      <LoginModal />
      <MypageContainer>
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
        >
          <ProfileImage
            title={mainBadge.name || "배지 없음"}
            name={userData.nickname}
            image={userData.profileImage}
            badgeIcon={
              mainBadge.badgeImage || "/src/assets/images/defaultBadge.png"
            }
          />
        </div>
        <MypageContent>
          <BadgeList title={`${userData.nickname}의 배지`} badges={badgeData} />
          <GenreChart data={genreScores} />
          <FavoriteList title="좋아요" items={favoriteItems} />
          <ReviewHeader>
            <ReviewTitle>{`${userData.nickname}의 리뷰`}</ReviewTitle>
            <MoreLink onClick={handleMoreClick}>{" 더보기"}</MoreLink>
          </ReviewHeader>
          <ReviewList reviews={reviewData} />
          {isLogined() && (
            <LogoutAndWithdraw
              onLogout={handleLogout}
              onWithdraw={handleWithdraw}
            />
          )}
        </MypageContent>
      </MypageContainer>
    </>
  );
};

export default MyPage;
