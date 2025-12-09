// src/user/notifications/NotificationModal.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheckCircle,
  faClock,
  faMapMarkerAlt,
  faCommentDots,
  faFileInvoice,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "./NotificationContext";
import { useCart } from "../cart/CartContext";

const icons = {
  success: (
    <FontAwesomeIcon
      icon={faCheckCircle}
      className="text-emerald-600 w-4 h-4"
    />
  ),
  reminder: (
    <FontAwesomeIcon icon={faClock} className="text-yellow-500 w-4 h-4" />
  ),
  map: (
    <FontAwesomeIcon
      icon={faMapMarkerAlt}
      className="text-blue-500 w-4 h-4"
    />
  ),
  review: (
    <FontAwesomeIcon
      icon={faCommentDots}
      className="text-purple-600 w-4 h-4"
    />
  ),
  invoice: (
    <FontAwesomeIcon icon={faFileInvoice} className="text-gray-500 w-4 h-4" />
  ),
  policy: (
    <FontAwesomeIcon icon={faUser} className="text-gray-500 w-4 h-4" />
  ),
};

const NotificationModal = () => {
  const { isOpen, setIsOpen, notifications, markAsRead } = useNotifications();
  const { setIsOpen: setCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Group notifications by category
  const grouped = notifications.reduce((acc, notif) => {
    acc[notif.category] = acc[notif.category] || [];
    acc[notif.category].push(notif);
    return acc;
  }, {});

  const sortedCategories = Object.entries(grouped).sort(([catA], [catB]) => 
    catA === "New Notifications" ? -1 : catB === "New Notifications" ? 1 : 0
  );

  // Handle button / CTA click per notification
  const handleNotificationAction = async (notif) => {
    // mark as read
    await markAsRead(notif.id);
    setIsOpen(false);

    // Navigate based on notification type
    const type = notif.type?.toUpperCase();
    if (type === "ORDER_ACCEPTED") {
      setCartOpen(true);
      return;
    }

    switch (type) {
      case "ORDER_REQUEST":
      case "ORDER_REJECTED":
      case "ORDER_CONFIRMED":
      case "ORDER_PLACED":
      case "ORDER_REMINDER":
      case "PENDING_PAYMENT":
      case "PAYMENT_RECEIVED":
      case "PAYMENT_SUCCESS":
      case "PAYMENT_FAILED":
      case "ORDER":
      case "PAYMENT":
        navigate("/my-bookings");
        break;
      case "REVIEW":
        navigate("/my-bookings");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="w-full max-w-sm md:w-96 bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
        {/* Header */}
        <header className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Notifications</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </header>

        {/* Notification List */}
        <div className="max-h-[80vh] overflow-y-auto divide-y divide-gray-100">
          {sortedCategories.map(([category, list]) => (
            <div key={category} className="mb-4">
              <h3 className="text-base font-bold text-gray-700 px-4 py-2 bg-gray-100 border-t border-b border-gray-200">
                {category}
              </h3>

              {list.map((n) => {
                const isUnread = !n.isRead;

                return (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`flex justify-between items-start px-4 py-3 cursor-pointer transition
                      ${
                        isUnread
                          ? "bg-[#217964] text-white hover:bg-[#1b6354]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                  >
                    {/* Left side: icon + text */}
                    <div className="flex space-x-3">
                      <div className="mt-0.5">
                        {icons[n.type] || (
                          <FontAwesomeIcon
                            icon={faBell}
                            className={`w-4 h-4 ${
                              isUnread ? "text-white" : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isUnread ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {n.message}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${
                            isUnread ? "text-emerald-100" : "text-gray-500"
                          }`}
                        >
                          {n.time}
                        </p>
                      </div>
                    </div>

                    {/* Right side: action button */}
                    {n.actionText && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row click
                          handleNotificationAction(n);
                        }}
                        className={`ml-3 text-xs font-semibold py-1.5 px-3 rounded-md border
                          ${
                            isUnread
                              ? "border-white text-white hover:bg-white hover:text-[#217964]"
                              : "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                          }`}
                      >
                        {n.actionText}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {notifications.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No new messages.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
