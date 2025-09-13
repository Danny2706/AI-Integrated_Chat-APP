import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        import.meta.env.MODE === "development" ?
            "https://ai-integrated-chat-app-5.onrender.com": "/",
    withCredentials: true
})
