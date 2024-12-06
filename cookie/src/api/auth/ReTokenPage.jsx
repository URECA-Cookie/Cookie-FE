import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";
import useNotificationStore from "../../stores/notificationStore";
import useUserStore from "../../stores/useUserStore";
import useAuthStore from "../../stores/useAuthStore";

//로그인 완료 후 토근 발급
const ReTokenPage = () => {
  const navigate = useNavigate();
  const setUserInfo = useUserStore.getState().setUserInfo;
  const logIn = useAuthStore.getState().logIn;
  useEffect(() => {
    axios
      .get(`${serverBaseUrl}/api/auth/retrieve-token`, {
        withCredentials: true,
      })
      .then((response) => {
        const accessToken = response.data.response.accessToken;
        const refreshToken = response.data.response.refreshToken;

        console.log(response);
        if (accessToken && refreshToken) {
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          console.log(accessToken);
          console.log(refreshToken);

          logIn();

          return axios.get(`${serverBaseUrl}/api/users/info`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else {
          throw new Error("토큰이 없습니다.");
        }
      })
      .then((response) => {
        const userInfo = response.data.response;
        console.log("유저 정보:", userInfo);
        setUserInfo(userInfo);

        // const eventSource = new EventSource(
        //   `http://localhost:8080/api/reviews/subscribe/push-notification`
        // );

        // const addNotification = useNotificationStore.getState().addNotification;

        // eventSource.onmessage = (event) => {
        //   const data = JSON.parse(event.data);
        //   console.log(data); // 이게 안찍혀!!!!!!  push-notification 여기 네트워크에서는 찍혀
        //   addNotification(data);
        // };

        // eventSource.addEventListener("push-notification", (event) => {
        //   const data = JSON.parse(event.data);
        //   console.log("푸시 알림 수신 데이터:", data);
        //   addNotification(data);
        // });

        // eventSource.onerror = (error) => {
        //   console.error("SSE 연결 에러:", error);
        //   eventSource.close();
        // };

        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to retrieve token:", error);
        navigate("/login");
      });
  }, [navigate, logIn]);

  return <div>토큰을 가져오는 중입니다…</div>;
};

export default ReTokenPage;
