import axios from "axios";

export const legacyGraph = async (endpoint, payload) => {
    const baseURL = BaseUrl();
  
    const instance = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" }
    });
    try {
      return await instance.post(`/${endpoint}`, payload);
    } catch (err) {
      return err.response;
    }
  };