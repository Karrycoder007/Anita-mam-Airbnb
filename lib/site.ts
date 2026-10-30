// Edit everything about the property here. All photos are placeholders: swap for the client's own.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;

export const site = {
  name: "Tropical Homes",
  area: "Calangute, Goa",
  whatsapp: "919999999999", // country code + number, no + or spaces
  email: "stay@casaolivar.in",
  airbnbUrl: "#", // paste the Airbnb listing link
  socials: {
    instagram: "https://instagram.com/yourhandle", // paste full link. Use "" to hide a button
    facebook: "",
    youtube: "",
  },
  rating: "4.9",
  reviews: 86,
  price: "₹9,500",
  checkIn: "2:00 pm",
  checkOut: "11:00 am",
};

export const img = {
  hero: u("photo-1566073771259-6a8506099945"),
  pool: u("photo-1540541338287-41700207dee6"),
  bed1: u("photo-1582719478250-c89cae4dc85b"),
  bed2: u("photo-1522708323590-d24dbb6b0267"),
  living: u("photo-1505691938895-1758d7feb511"),
  kitchen: u("photo-1556911220-bff31c812dba"),
  bath: u("photo-1584622650111-993a426fbf0a"),
  decor: u("photo-1618221195710-dd6b41faaea6"),
};

export const gallery = [
  { src: img.pool, alt: "The pool at golden hour", cap: "The pool, ten steps from the door" },
  { src: img.living, alt: "Living room", cap: "Living room with pool view" },
  { src: img.bed1, alt: "Master bedroom", cap: "Master bedroom" },
  { src: img.decor, alt: "Dining area", cap: "Dining for eight" },
  { src: img.kitchen, alt: "Kitchen", cap: "Fully equipped kitchen" },
  { src: img.bath, alt: "Bathroom", cap: "Ensuite bathroom" },
];

export const spaces = [
  { name: "Master bedroom", text: "King bed, ensuite bathroom and sliding doors that open straight to the pool deck.", img: img.bed1 },
  { name: "Second bedroom", text: "Queen bed, wardrobe and a quiet garden-side window. Ensuite bathroom.", img: img.bed2 },
  { name: "Third bedroom", text: "Two single beds that can join into one. Works for kids, friends or a work-from-Goa setup.", img: img.decor },
  { name: "Living and dining", text: "Open plan, with a sofa that faces the water and a table that seats eight.", img: img.living },
  { name: "Kitchen", text: "Induction hob, fridge, microwave, crockery and cookware for proper home cooking.", img: img.kitchen },
];

export const amenities = [
  { group: "Pool and outdoors", items: ["Shared pool, visible from the living room", "Ground-floor, step-free entry", "Private sit-out", "Sun loungers", "Free parking"] },
  { group: "Kitchen and dining", items: ["Induction hob and microwave", "Refrigerator", "Cookware and crockery", "Coffee maker and kettle", "Filtered drinking water"] },
  { group: "Comfort", items: ["Air conditioning in every bedroom", "Fast Wi-Fi", "Smart TV", "Hot water", "Fresh linen and towels"] },
  { group: "Work and extras", items: ["Dedicated work table", "Washing machine", "Iron and hair dryer", "Daily housekeeping on request", "Airport pick-up on request"] },
  { group: "Safety", items: ["CCTV at entrances", "Smoke alarm and first-aid kit", "Gated, secure complex", "Caretaker on call"] },
];

export const nearby = [
  { name: "Calangute Beach", tag: "Beach", time: "5 min drive", img: u("photo-1507525428034-b723cf961d3e") },
  { name: "Baga and Tito's Lane", tag: "Cafes and nightlife", time: "10 min drive", img: u("photo-1514933651103-005eec06c04b") },
  { name: "Saturday Night Market", tag: "Food and shopping", time: "15 min drive", img: u("photo-1555939594-58d7cb561ad1") },
  { name: "Mopa or Dabolim Airport", tag: "Getting here", time: "40 to 55 min drive", img: u("photo-1436491865332-7a61a109cc05") },
];

export const reviews = [
  { q: "Opened the curtains and the pool was right there. We barely left the house for two days.", name: "Priya and family", place: "Mumbai", photo: u("photo-1494790108377-be9c29b29330") },
  { q: "Spotless, well stocked kitchen and the host replied to every message within minutes.", name: "Rahul Mehta", place: "Bengaluru", photo: u("photo-1507003211169-0a1dd7228f2d") },
  { q: "Perfect for our group of six. Everyone had their own room and the pool was ours in the mornings.", name: "Ananya Rao", place: "Pune", photo: u("photo-1438761681033-6461ffad8d80") },
  { q: "Easy check-in, quiet at night, and the beach is close. We will be back next season.", name: "Vikram Shah", place: "Delhi", photo: u("photo-1500648767791-00dcc994a43e") },
];

export const faqs = [
  { q: "Is the pool private?", a: "The pool is shared with the other residents of the complex and is a few steps from your door." },
  { q: "How many guests can stay?", a: "Up to 8 guests across 3 bedrooms. Please tell us the final headcount when you enquire." },
  { q: "Are pets allowed?", a: "Please ask before booking. Small, well-behaved pets can be approved case by case." },
  { q: "Can you arrange a cook or airport pick-up?", a: "Yes. Message us a day ahead and we will arrange both." },
  { q: "What is the cancellation policy?", a: "Follows the Airbnb policy shown on the listing for your dates." },
];

export const rules = ["Check-in from 2:00 pm, check-out by 11:00 am", "No parties or events", "Quiet hours after 10:00 pm", "Smoking only on the sit-out", "Pool timing 7:00 am to 9:00 pm"];