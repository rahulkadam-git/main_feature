import axios from "axios";

const api = axios.create({
    baseURL :process.env.REACT_APP_API_KEY || "http://localhost:4000/api"
})

export default api;