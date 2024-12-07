import useNotificationStore from "../stores/notificationStore";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("알림 권한 허용");

      const token = await new Promise((resolve) => {
        setTimeout(async () => {
          resolve(
            await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            })
          );
        }, 1000);
      });
      if (token) {
        console.log("FCM 토큰:", token);
        return token;
      } else {
        console.error("토큰 가져오기 실패");
      }
    } else {
      console.error("알림 권한 거부됨");
    }
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
  }
};

export const setupOnMessageHandler = () => {
  const addNotification = useNotificationStore.getState().addNotification;
  onMessage(messaging, (payload) => {
    console.log("알림 내용: ", payload);

    const notificationTitle = payload.notification.title;
    const notificationBody = payload.notification.body;

    const notificationData = {
      title: notificationTitle,
      body: notificationBody,
      timestamp: new Date().toLocaleString(),
    };

    addNotification(notificationData);

    const notificationOptions = {
      body: payload.notification.body,
      image: payload.notification.image,
      icon: payload.notification.icon,
    };

    const notification = new Notification(
      notificationTitle,
      notificationOptions
    );

    notification.onclick = function (event) {
      event.preventDefault();
      console.log("notification clicked!");
      notification.close();
    };
  });
};

setupOnMessageHandler();
