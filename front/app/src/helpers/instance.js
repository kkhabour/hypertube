import axios from "axios";
const config = require("../constants/config");

const { host, img, front } = config;

export function getInstance(token) {
  return axios.create({
    baseURL: `${host}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const Instance = axios.create({
  baseURL: `${host}`,
});

export const hostUrl = host;
export const imgUrl = img;

export const ApiAllMovie = axios.create({
  baseURL: `https://yts.mx/api/v2/list_movies.json`,
});

export const api = axios.create({
  baseURL: `https://yts.mx/api/v2`,
});

export const BackupAllMovie = axios.create({
  baseURL: `https://yts.megaproxy.biz/api/v2/list_movies.json`,
});

export const Backup = axios.create({
  baseURL: `https://yts.megaproxy.biz/api/v2`,
});
export const urlIntra = `http://api.intra.42.fr/oauth/authorize?client_id=57b5ab3c42e7495e50cb4a00cb262df5cd809cbecd97e8ef879eee6199287c7b&redirect_uri=${front}/omniauth/intra&response_type=code`;
export const urlGithub = `https://github.com/login/oauth/authorize?client_id=365d2eca620e2290f5ad&redirect_uri=${front}/omniauth/github`;
