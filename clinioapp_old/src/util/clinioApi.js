import axios from "axios";

export default axios.create({baseURL: "https://clinioapi.herokuapp.com/", responseType:"application/json"});