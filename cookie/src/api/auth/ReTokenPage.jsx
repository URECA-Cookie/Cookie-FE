import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverBaseUrl from "../../config/apiConfig";
import useNotificationStore from "../../stores/notificationStore";

//로그인 완료 후 토근 발급
const ReTokenPage = () => {
  const navigate = useNavigate();

  //TODO 배포서버 주소도 사용하기

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

          const eventSource = new EventSource(
            `http://localhost:8080/api/reviews/subscribe/push-notification`
          );

          const addNotification =
            useNotificationStore.getState().addNotification;

          // eventSource.onmessage = (event) => {
          //   const data = JSON.parse(event.data);
          //   console.log(data); // 이게 안찍혀!!!!!!  push-notification 여기 네트워크에서는 찍혀
          //   addNotification(data);
          // };

          eventSource.addEventListener("push-notification", (event) => {
            const data = JSON.parse(event.data);
            console.log("푸시 알림 수신 데이터:", data);
            addNotification(data);
          });

          eventSource.onerror = (error) => {
            console.error("SSE 연결 에러:", error);
            eventSource.close();
          };

          navigate("/");
        } else {
          console.error("Authorization header missing in response");
        }
      })
      .catch((error) => {
        console.error("Failed to retrieve token:", error);
        navigate("/login");
      });
  }, [navigate]);

  return <div>토큰을 가져오는 중입니다…</div>;
};

export default ReTokenPage;
