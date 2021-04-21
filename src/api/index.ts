import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://raw.githubusercontent.com/WilliamRu/TestAPI/master/",
});

export const getData = () => {
  return axios.get("db.json");
};
