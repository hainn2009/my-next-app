import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "pending")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [activeNotification]);
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
