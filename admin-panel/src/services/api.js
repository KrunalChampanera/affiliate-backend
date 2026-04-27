import axios from "axios"

const API = axios.create({
  baseURL: "http://https://affiliate-backend-vm5i.onrender.com/api",
})

API.interceptors.request.use((config) => {
  // Try all possible token key names
  const token =
    localStorage.getItem("admin_token") ||
    localStorage.getItem("adminToken")  ||
    localStorage.getItem("token")

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  return config
}, (error) => Promise.reject(error))

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("admin_token")
      localStorage.removeItem("adminToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default API