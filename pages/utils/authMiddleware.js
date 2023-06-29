import { getCookie } from './cookie';

import Cookies from "js-cookie";

export function authMiddleware(context) {
  const token = Cookies.get('token');
    // console.log("hello tokenauthhh atuh", Cookies.get('token'))
    // if (!token) {
    //     context.res.writeHead(302, {location:'/login'});
    //     context.res.end();
    // }
// decode dan memeriksa waktu expired token
// const decodedToken = decodeToken(token);
// if (isTokenExpired(decodedToken)) {
//   /// Jika token kedaluwarsa, redirect ke halaman login
// //   context.res.writeHead(302, { Location: '/login' });
// //   context.res.end();
// }
      // Token valid, lanjutkan ke halaman yang diminta
  return { token};
}

// function decodeToken(token) {
//   try {
//     const decoded = jwt.verify(token, 'tokentoken'); // Ganti 'secret-key' dengan kunci rahasia yang sesuai

//     return decoded;
//   } catch (error) {
//     console.error('Gagal mendekode token:', error.message);
//     return null;
//   }
// }


function isTokenExpired(decodedToken) {
    if (!decodedToken || !decodedToken.exp) {
      return true; // Jika token tidak valid atau tidak memiliki waktu kedaluwarsa, anggap token telah kedaluwarsa
    }
  
    const expirationTime = decodedToken.exp * 1000; // Konversi ke milidetik
    const currentTime = Date.now();
    const expiresIn = Math.floor((expirationTime - currentTime) / 1000); // Menghitung sisa waktu kedaluwarsa dalam detik
  
    return expiresIn <= 0; // Token kedaluwarsa jika expiresIn kurang dari atau sama dengan 0
  }


  
  