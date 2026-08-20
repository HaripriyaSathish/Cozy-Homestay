import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchSiteContent = () => api.get("/content/").then((res) => res.data);

export const submitBookingEnquiry = (payload) => api.post("/bookings/", payload).then((res) => res.data);

export const submitContactEnquiry = (payload) => api.post("/contact/", payload).then((res) => res.data);
