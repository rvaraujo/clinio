import axios from "axios";

export default axios.create({baseURL: "https://localhost:5001/", responseType:"application/json"});