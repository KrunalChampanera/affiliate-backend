// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://https://affiliate-backend-vm5i.onrender.com/api"
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;

import axios from "axios"

const API = axios.create({
  baseURL: "http://https://affiliate-backend-vm5i.onrender.com/api",
})

// ── REQUEST interceptor ───────────────────────────────────────
// Automatically attach the token on EVERY request
API.interceptors.request.use(
  (config) => {
    // User token (for frontend routes like /orders, /cart, etc.)
    const token = localStorage.getItem("token")

    // Admin token (for /admin/* routes)
    const adminToken = localStorage.getItem("adminToken")

    // Pick whichever token exists — admin takes priority if both present
    const activeToken = adminToken || token

    if (activeToken) {
      config.headers["Authorization"] = `Bearer ${activeToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// ── RESPONSE interceptor ──────────────────────────────────────
// Handle 401 globally — redirect to login if token expired
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on login page
      const isAdminRoute = window.location.pathname.startsWith("/dashboard") ||
        window.location.pathname.startsWith("/admin") ||
        window.location.pathname.startsWith("/users") ||
        window.location.pathname.startsWith("/orders") ||
        window.location.pathname.startsWith("/products")

      if (isAdminRoute) {
        localStorage.removeItem("adminToken")
        window.location.href = "/"           // redirect admin to login
      } else {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/account"    // redirect user to login
      }
    }
    return Promise.reject(error)
  }
)

export default API