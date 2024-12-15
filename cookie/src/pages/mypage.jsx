import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImage from "../components/mypage/ProfileImage";
import BadgeList from "../components/mypage/BadgeList";

import FavoriteList from "../components/mypage/FavoriteList";
import ReviewList from "../components/mypage/ReviewList";
import LogoutAndWithdraw from "../components/mypage/LogoutAndWithdraw";
import LoginModal from "../components/common/LoginModal";
import axiosInstance from "../api/auth/axiosInstance";
import { toast } from "react-hot-toast";
import useAuthStore from "../stores/useAuthStore";
import Spinner from "../components/common/Spinner";
import PointHistory from "../components/matchup/PointSection";
import PushNotificationToggle from "../components/mypage/PushNotificationToggle";
import LogoutModal from "../components/mypage/LogoutModal";
import WithdrawModal from "../components/mypage/WithdrawModal";

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  position: relative;
`;

const MypageContent = styled.div`
  background-color: white;

  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 200px;
  z-index: 1;
  box-sizing: border-box;
  padding: 20px;

  border: 4px solid transparent;
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
  color: #F84B99;
`;

const MoreLink = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1.5rem;

  color: black;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #00d6e8;
  }
`;

const MyPage = () => {
  const [userData, setUserData] = useState({ nickname: "", profileImage: "" });
  const [badgeData, setBadgeData] = useState([]);
  const [badgePoint, setBadgePoint] = useState(0);
  const [genreScores, setGenreScores] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const logOut = useAuthStore((state) => state.logOut);
  const isLogined = useAuthStore((state) => state.isLogined);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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

        const {
          nickname,
          profileImage,
          badge,
          badgePoint,
          genreScores,
          reviews,
          pushEnabled,
        } = response.data.response;

        console.log("푸시 알림 상태:", pushEnabled);
        console.log("닉네임:", nickname);

        setUserData({ nickname, profileImage });
        setBadgePoint(badgePoint || 0);
        setPushEnabled(pushEnabled);

        setBadgeData(
          badge?.map((b) => ({
            name: b.name || "배지 없음",
            badgeImage: b.badgeImage || "/assets/images/defaultBadge.png",
            main: b.main || false,
          })) || []
        );

        const genreData =
          genreScores?.length > 0
            ? Object.entries(genreScores[0])
                .filter(([key]) => key !== "id" && key !== "userId")
                .map(([name, points]) => ({ name, points }))
            : [];
        setGenreScores(genreData);

        const transformedReviews =
          reviews?.map((review) => ({
            reviewId: review.reviewId,
            content: review.content,
            movieScore: review.movieScore,
            reviewLike: review.reviewLike,
            createdAt: review.createdAt,
            movie: {
              title: review.movie.title || "영화 제목 없음",
              poster:
                review.movie.poster || "/assets/images/default-poster.png",
            },
            user: {
              nickname: review.user.nickname || "익명",
              profileImage:
                review.user.profileImage || "/assets/images/default-user.png",
            },
          })) || [];

        console.log("변환된 리뷰:", transformedReviews);
        setReviewData(transformedReviews);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };

    fetchUserData();
  }, [isLogined, openLoginModal]);

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`, { state: { fromMyPage: true } });
  };

  const mainBadge = badgeData.find((badge) => badge.main) || {};
  const favoriteItems = [{ label: "좋아한 영화" }, { label: "좋아한 리뷰" }];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete("/api/notification/fcm-token");
      console.log("FCM 토큰 삭제 성공");

      logOut();
      sessionStorage.clear();
      localStorage.clear();

      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("FCM 토큰 삭제 실패:", error);
      toast.error("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
      setShowLogoutModal(false); // 모달 닫기
    }
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete("/api/users");
      logOut();
      sessionStorage.clear();
      localStorage.clear();
      toast.success("탈퇴가 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("탈퇴 요청 실패:", error);
      toast.error("탈퇴 중 문제가 발생했습니다.\n다시 시도해주세요.");
    } finally {
      setIsLoading(false);
      setShowWithdrawModal(false);
    }
  };

  const handleMoreClick = () => {
    navigate("/myAllReviewList");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handlePointHistoryClick = () => {
    if (!isLogined()) {
      openLoginModal();
    } else {
      navigate("/point-history");
    }
  };
  return (
    <>
      <LoginModal />

      {isLoading && <Spinner />}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          onConfirm={handleWithdraw}
          onCancel={() => setShowWithdrawModal(false)}
        />
      )}
      <MypageContainer>
        <div
          style={{
            position: "absolute",
            top: "50px",
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
          <BadgeList badges={badgeData} />
          {/* <GenreChart data={genreScores} /> */}
          <PointHistory
            badgePoint={badgePoint}
            onClick={handlePointHistoryClick}
          />

          <FavoriteList title="좋아요" items={favoriteItems} />
          <PushNotificationToggle pushEnabled={pushEnabled} />

          <ReviewHeader>
            <ReviewTitle>{`${userData.nickname}의 리뷰`}</ReviewTitle>
            <MoreLink onClick={handleMoreClick}>{" 더보기"}</MoreLink>
          </ReviewHeader>
          <ReviewList reviews={reviewData} onReviewClick={handleReviewClick} />
          {isLogined() && (
            <LogoutAndWithdraw
              onLogout={() => setShowLogoutModal(true)}
              onWithdraw={() => setShowWithdrawModal(true)}
            />
          )}
        </MypageContent>
        <button onClick={() => handleNotificationClick()}>알림 목록</button>
      </MypageContainer>
    </>
  );
};

export default MyPage;
