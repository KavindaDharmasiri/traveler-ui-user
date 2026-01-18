import axios from '../user/api/axios';
import { API_CONFIG } from '../config/environment';


export const menulinks=[
    {name:"Home",path:"/home"},
    {name:"RentItems",path:"/rentItems"},
    {name:"My Bookings",path:"/my-bookings"},
    {name:"My Orders",path:"/my-orders"},
]

export const cityList=['Akkaraipattu','Aluthgama','Ampara','Anuradhapura','Awissawella','Badulla','Balangoda','Bandarawela','Batticaloa','Beruwala',
'Chilaw','Colombo','Dambulla','Dehiwala','Embilipitiya','Galle','Gampaha','Gampola','Hatton','Haputale',
'Hingurakgoda','Homagama','Horana','Ja-Ela','Jaffna','Kadawatha','Kalmunai','Kalutara','Kandy','Kantale',
'Katunayake','Kelaniya','Kesbewa','Kegalle','Kilinochchi','Kinniya','Kotte','Kurunegala','Maharagama','Mahiyanganaya',
'Mannar','Matara','Minuwangoda','Monaragala','Moratuwa','Mount Lavinia','Mullaitivu','Nawalapitiya','Negombo','Nugegoda',
'Nuwara Eliya','Panadura','Peliyagoda','Piliyandala','Polonnaruwa','Puttalam','Ragama','Ratnapura','Sammanthurai','Seeduwa',
'Sigiriya','Talawakele','Trincomalee','Vavuniya','Wadduwa','Wattala','Wellawaya'
] 



export const dummyItemData = []

export const testimonials = [];

export const mockOrdersList = [];

export const mockOrderDetail = {}

export const getOrderStatusStyles = (status) => {
    switch (status) {
        case 'Upcoming': return 'text-blue-600 bg-blue-100';
        case 'Completed': return 'text-green-600 bg-green-100';
        case 'Cancelled': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
}


export const getDetailStatusStyles = (status) => {
    switch (status) {
        case 'Confirmed': return 'text-green-600 bg-green-100';
        case 'Pending': return 'text-yellow-600 bg-yellow-100';
        case 'Cancelled': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
    }
}

export const groupBookingsByVendor = (items) => {
  if (!Array.isArray(items)) return {};

  return items.reduce((groups, item) => {
    const vendor = item?.vendorName || "Unknown Vendor";

    if (!groups[vendor]) {
      groups[vendor] = [];
    }

    groups[vendor].push(item);
    return groups;
  }, {});
};
