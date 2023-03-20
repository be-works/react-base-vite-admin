const API_URL = {
  AUTH: {
    LOGIN: "auth/login",
  },
  USER: {
    GET: "user/list",
    GETID: (id: number) => `user/detail/${id}`,
    POST: "user/insert",
    PUT: "user/update",
    DELETE: (id: number) => `user/delete/${id}`,
    SEARCH: (key: string) => `/user/search?key=${key}`,
  },
  STATISTIC: {
  },
};

export default API_URL;
