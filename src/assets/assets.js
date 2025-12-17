import axios from '../user/api/axios';
import { API_CONFIG } from '../config/environment';
import hero_mp4 from './3015510-hd_1920_1080_24fps.mp4'

export const menulinks=[
    {name:"Home",path:"/"},
    {name:"RentItems",path:"/rentItems"},
    {name:"My Bookings",path:"/my-bookings"},
]

export const cityList=['New York','Sri Lanka','India']

export const assets={
    hero_mp4
}

export const dummyItemData = [{
    id: 1, 
    name: "Casual Shoes",
    category: "Sports",
    price: 100,
    offerPrice: 80,
    isAvailable: true,
    isDiscount: true,
    rating: 4,
    image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImageWithoutBg.png",
    Brand: "AthletaFlex",
    description: "Lightweight and durable casual sneakers, perfect for daily wear or low-impact workouts. Featuring breathable mesh and a responsive cushioned sole for all-day comfort."
},
{
    id: 2,
    name: "Backpacking Tent (2-Person)",
    category: "Camping Gear",
    price: 35,
    offerPrice: 30,
    isAvailable: true,
    isDiscount: true,
    rating: 5,
    image: "https://images.unsplash.com/photo-1684815048125-b9d264b84796?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Brand: "TrailBlaze",
    description: "Ultra-lightweight two-person tent designed for easy transport on long hikes. Quick setup, waterproof flysheet, and ample ventilation for a comfortable night under the stars."
},
{
    id: 3,
    name: "High-Capacity Power Bank",
    category: "Electronics",
    price: 15,
    offerPrice: 0,
    isAvailable: true,
    isDiscount: false,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG93ZXIlMjBiYW5rfGVufDB8fDB8fHww",
    Brand: "ChargeMax",
    description: "20,000mAh portable power bank with fast-charging USB-C and USB-A ports. Perfect for keeping phones, tablets, and cameras charged during extended trips or events."
},
{
    id: 4,
    name: "Mountain Bike (Large)",
    category: "Sports",
    price: 90,
    offerPrice: 90,
    isAvailable: false,
    isDiscount: false,
    rating: 4,
    image: "https://media.istockphoto.com/id/1369082308/photo/mtb-mountain-biking-outdoor-on-the-dolomites-enduro-discipline-over-a-single-trail-track.webp?a=1&b=1&s=612x612&w=0&k=20&c=QD8R_PxBzp9hrfIJd8fN4MEYOAVpTXCSRaEmriiZq-8=",
    Brand: "OffRoad X",
    description: "A large-frame mountain bike (29er) with front suspension and hydraulic disc brakes. Ideal for challenging trails and cross-country cycling. Note: Currently unavailable for rental."
},
{
    id: 5,
    name: "Paddle Board Kit",
    category: "Water Sports",
    price: 55,
    offerPrice: 45,
    isAvailable: true,
    isDiscount: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1670606409379-bd5185d95096?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFkZGxlJTIwYm9hcmR8ZW58MHx8MHx8fDA%3D",
    Brand: "AquaSurf",
    description: "Inflatable Stand-Up Paddleboard (SUP) kit, including board, adjustable paddle, air pump, and carrying bag. Perfect for calm lakes and coastal waters."
},
{
    id: 6,
    name: "Professional Camera Lens",
    category: "Photography",
    price: 45,
    offerPrice: 0,
    isAvailable: true,
    isDiscount: false,
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww",
    Brand: "ProFocus",
    description: "A high-quality 50mm f/1.4 prime lens suitable for professional-grade portraits and low-light photography. Compatible with major DSLR/Mirrorless systems (specify mount upon rental)."
}]

export const testimonials = [
    { id: 1, name: "Emma Rodriguez", address: "Barcelona, Spain", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" },
    { id: 2, name: "Liam Johnson", address: "New York, USA", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "I'm truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" },
    { id: 3, name: "Sophia Lee", address: "Seoul, South Korea", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." },
    { id: 4, name: "Noah Chen", address: "Shanghai, China", image: "https://images.unsplash.com/photo-1507003211169-0a816d50f678?q=80&w=200", rating: 5, review: "Absolutely outstanding work! Their expertise is clear, and they delivered exactly what was promised ahead of schedule. Will definitely use again." },
    { id: 5, name: "Olivia Müller", address: "Berlin, Germany", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200", rating: 4, review: "Very reliable and communicative. While there was a slight delay, the final product was of high quality and the team was easy to work with." },
    { id: 6, name: "Ethan Davis", address: "Toronto, Canada", image: "https://images.unsplash.com/photo-1506794778202-dfa112da11d4?q=80&w=200", rating: 5, review: "The level of customer support was superb. Every question was answered quickly and thoroughly. The best service I've received in years." },
    { id: 7, name: "Ava García", address: "Mexico City, Mexico", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200", rating: 5, review: "Highly recommend! The service was seamless, incredibly fast, and the staff were exceptionally friendly. Five stars across the board." },
    { id: 8, name: "Marcus Koyama", address: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1568602471035-aac213f0e0f2?q=80&w=200", rating: 4.5, review: "Great value for the money. The product itself is fantastic, and the support documentation was very helpful in getting set up quickly." }
];

export const mockOrdersList = [
    { orderId: 'T-987654', orderDate: '2025-11-25', startDate: '2025-12-10', endDate: '2026-02-05', totalItems: 4, totalTripPrice: 535.00, status: 'Upcoming' },
    { orderId: 'T-001234', orderDate: '2025-10-01', startDate: '2025-10-15', endDate: '2025-10-20', totalItems: 2, totalTripPrice: 125.50, status: 'Completed' },
    { orderId: 'T-555999', orderDate: '2026-03-01', startDate: '2026-03-10', endDate: '2026-03-12', totalItems: 1, totalTripPrice: 45.00, status: 'Cancelled' },
];

export const mockOrderDetail = {
   orderId: 'T-987654',
    orderDate: '2025-11-25',
    totalTripPrice: 535.00,
    items: [
        { 
            id: 'B001', itemName: '4K Drone Kit', vendorName: 'Adventure Gear Pro', 
            pickupLocation: 'San Francisco, CA', pickupDate: '2025-12-10', 
            returnDate: '2025-12-15', itemPrice: 150.00, status: 'Confirmed',
            vendorContact: '(415) 555-1234', mapUrl: 'https://maps.google.com/sf_pro_gear'
        },
        { 
            id: 'B002', itemName: 'Camping Tent (4-person)', vendorName: 'Outdoor Essentials HQ', 
            pickupLocation: 'Denver, CO', pickupDate: '2025-12-20', 
            returnDate: '2025-12-27', itemPrice: 75.00, status: 'Pending',
            vendorContact: '(303) 555-5678', mapUrl: 'https://maps.google.com/denver_outdoor_hq'
        },
        { 
            id: 'B003', itemName: 'Professional Camera Lens', vendorName: 'Adventure Gear Pro', 
            pickupLocation: 'San Francisco, CA', pickupDate: '2026-01-05', 
            returnDate: '2026-01-12', itemPrice: 220.00, status: 'Confirmed',
            vendorContact: '(415) 555-1234', mapUrl: 'https://maps.google.com/sf_pro_gear'
        },
    ]
}

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
