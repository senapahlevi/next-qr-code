
import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken';
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

export function setCookie(name, value) {
  const decodedToken = decodeToken(value)
  const expiresIn = decodedToken.exp
  console.log("hore",decodedToken.exp)
  // Cookies.set(name, value, { expires: 1 }); // Cookie berlaku sesuai dengan expiresIn

  const expires = new Date();
  expires.setTime(expires.getTime() + expiresIn * 1000); // Konversi expiresIn dari detik ke milidetik
  Cookies.set(name, value, { expires });
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function removeCookie(name) {
  Cookies.remove(name);
}