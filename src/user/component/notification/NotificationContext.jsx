// src/user/notifications/NotificationContext.jsx
import { createContext, useContext, useState } from "react";
import { initialNotifications } from "../../notificationData";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Move a notification from "New Notifications" to "Read Messages"
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;

        // Only move if it's currently in "New Notifications"
        if (n.category === "New Notifications") {
          return { ...n, category: "Read Messages" };
        }
        return n;
      })
    );
  };

  const unreadCount = notifications.filter(
    (n) => n.category === "New Notifications"
  ).length;

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        notifications,
        markAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);