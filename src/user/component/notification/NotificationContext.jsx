import { createContext, useContext, useState, useEffect } from "react";
import { notificationService } from "../../api/notificationService";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const tenantId = localStorage.getItem('tenantId');
    if (!tenantId) return;
    
    try {
      const data = await notificationService.getNotifications(tenantId);
      const formatted = data.map(n => ({
        id: n.id,
        message: n.title,
        time: new Date(n.createdAt).toLocaleString(),
        type: n.notificationType?.toLowerCase() || 'success',
        category: n.read ? "Read Messages" : "New Notifications",
        isRead: n.read,
        actionText: "View",
        actionType: "booking",
        details: n.message
      })).sort((a, b) => a.isRead - b.isRead);
      setNotifications(formatted);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  const fetchUnreadCount = async () => {
    const tenantId = localStorage.getItem('tenantId');
    if (!tenantId) return;
    
    try {
      const count = await notificationService.getUnreadCount(tenantId);
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => n.id === id ? { ...n, category: "Read Messages", isRead: true } : n)
      );
      fetchUnreadCount();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ isOpen, setIsOpen, notifications, markAsRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
