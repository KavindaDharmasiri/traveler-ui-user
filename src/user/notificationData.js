// src/user/notifications/notificationData.js
export const initialNotifications = [
  { id: 1, type: "success",  category: "New Notifications",  message: "Booking Confirmed: #TRV-12345 - Hiking Backpacks, 2 Units.", time: "Just now", actionText: "View Details", actionType: "view" },
  { id: 2, type: "reminder", category: "New Notifications",  message: "Return Reminder: Your Tent Rental (#TRV-12300) is due back tomorrow.", time: "2 hours ago", actionText: "Schedule Return", actionType: "schedule" },
  { id: 3, type: "map",      category: "Read Messages",      message: "Gear Pickup Confirmed: Your items are ready at the downtown store.", time: "Yesterday at 4:30 PM", actionText: "View Map", actionType: "map" },
  { id: 4, type: "review",   category: "Read Messages",      message: "How was your last rental? Leave a review and get 10% off your next booking.", time: "Oct 20, 2023", actionText: "Leave Review", actionType: "review" },
  { id: 5, type: "invoice",  category: "Past Messages",      message: "Your Oct 2023 Rental History is now available.", time: "Oct 15, 2023", actionText: "Download Invoice", actionType: "download" },
  { id: 6, type: "policy",   category: "Past Messages",      message: "Account Policy Update: Changes to late fees and cancellation terms.", time: "Sept 28, 2023", actionText: "Learn More", actionType: "learn" },
];
