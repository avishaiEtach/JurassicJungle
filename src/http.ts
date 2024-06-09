import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "http://localhost:8080";

const axios: AxiosInstance = Axios.create({
  withCredentials: true,
});

export const http = {
  get(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data: any): Promise<any> {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data: any): Promise<any> {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data?: any): Promise<any> {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data: any = null
): Promise<any> {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    };
    const res: AxiosResponse<any> = await axios(config);
    return res.data;
  } catch (err: any) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${JSON.stringify(
        data
      )}`
    );
    throw err;
  }
}

// import axios, { AxiosResponse } from "axios";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:8080"
//     : "http://localhost:8080";

// axios.defaults.withCredentials = true;

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// export const http = {
//   get: <T>(url: string) =>
//     axios
//       .get<T>(url)
//       .then(responseBody)
//       .catch((err) => {
//         errorHandler(err);
//       }),
//   post: <T>(url: string, body?: any) =>
//     axios
//       .post<T>(url, body)
//       .then(responseBody)
//       .catch((err) => {
//         errorHandler(err);
//       }),
//   put: <T>(url: string, body?: any) =>
//     axios
//       .put<T>(url, body)
//       .then(responseBody)
//       .catch((err) => {
//         errorHandler(err);
//       }),
//   patch: <T>(url: string, body?: any) =>
//     axios
//       .patch<T>(url, body)
//       .then(responseBody)
//       .catch((err) => {
//         errorHandler(err);
//       }),
//   delete: <T>(url: string) =>
//     axios
//       .delete<T>(url)
//       .then(responseBody)
//       .catch((err) => {
//         errorHandler(err);
//       }),
// };
// const errorHandler = (err: any) => {
//   throw err.response.data;
// };
