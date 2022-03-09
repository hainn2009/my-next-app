import { createContext } from "react";
import { useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  function showNotificationHandler({ title, message, status }) {
    setActiveNotification({ title, message, status });
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
