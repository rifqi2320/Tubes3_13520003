import axios from "axios";

const ax = axios.create({
  baseURL: "https://tubes-3-stima-backend.herokuapp.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default ax;
