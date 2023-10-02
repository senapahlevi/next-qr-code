// "use client";

// import Link from "next/link";
// import { removeCookie } from "../utils/cookie";
// import { useRouter } from "next/router";

// function Header() {
//   const router = useRouter();

//   const handleLogout = () => {
//     removeCookie("token");
//     router.push("/login");
//   };
//   return (
//     <div class="navbar-1-1 mt-5">
//       <style scoped>
//         {`
    
//       @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

//       .navbar-1-1 .btn-fill {
//         background-color: #0ec8f8;
//         transition: 0.3s;
//       }

//       .navbar-1-1 .btn-fill:hover {
//         background-color: #3ad8ff;
//         transition: 0.3s;
//       }

//       .navbar-1-1 nav a.nav-link {
//         color: #092a33;
//         transition: 0.3s;
//       }

//       .navbar-1-1 nav a.nav-link:hover {
//         color: #2c3b3f;
//         font-weight: 500;
//         transition: 0.3s;
//       }

//       .navbar-1-1 nav a.nav-link.active {
//         color: #2c3b3f;
//       }

//       .navbar-1-1 #menu-toggle:checked+#menu,
//       .navbar-1-1 #menu-toggle:checked+#menu+#menu {
//         display: block;
//       }
//     `}
//       </style>

//       {/* <div class="container mx-auto flex flex-wrap flex-row items-center justify-between">
//         <label for="menu-toggle" class="cursor-pointer lg:hidden block">
//           <svg
//             class="w-6 h-6"
//             fill="none"
//             stroke="#092A33"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </label>
//         <input class="hidden" type="checkbox" id="menu-toggle" />
//         <div
//           class="hidden lg:flex lg:items-center lg:w-auto w-full lg:ml-auto lg:mr-auto flex-wrap items-center text-base justify-center"
//           id="menu"
//         >
//           <nav class="lg:space-x-12 space-x-0 lg:flex items-center justify-between text-base pt-8 lg:pt-0 lg:space-y-0 space-y-6">
//             <Link href="/" class="block nav-link active font-medium">
//               Home
//             </Link>
//             <Link href="/all-data" class="block nav-link">
//               Lihat Data
//             </Link>
//             <Link href="/calculate" class="block nav-link">
//               Calculate
//             </Link>
            
//           </nav>
//         </div>

//         <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
//           <button onClick={handleLogout} class="btn-fill text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 lg:mt-0 bg-purple-600">
//             Logout
//           </button>
//         </div>
//       </div> */}
//       <div class="container mx-auto flex flex-wrap flex-row items-center justify-between">
//         <a href="" class="flex font-medium items-center">
//           <svg
//             width="42"
//             height="42"
//             viewBox="0 0 42 42"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M3.5 15.75C3.5 8.98451 8.98451 3.5 15.75 3.5H29.75C30.7165 3.5 31.5 4.2835 31.5 5.25C31.5 6.2165 30.7165 7 29.75 7H15.75C10.9175 7 7 10.9175 7 15.75V29.75C7 30.7165 6.2165 31.5 5.25 31.5C4.2835 31.5 3.5 30.7165 3.5 29.75V15.75Z"
//               fill="#0EC8F8"
//             />
//             <path
//               d="M10.5 17.5C10.5 13.634 13.634 10.5 17.5 10.5H31.5C35.366 10.5 38.5 13.634 38.5 17.5V31.5C38.5 35.366 35.366 38.5 31.5 38.5H17.5C13.634 38.5 10.5 35.366 10.5 31.5V17.5Z"
//               fill="#0EC8F8"
//             />
//           </svg>
//         </a>
//         <label for="menu-toggle" class="cursor-pointer lg:hidden block">
//           <svg
//             class="w-6 h-6"
//             fill="none"
//             stroke="#092A33"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </label>
//         <input class="hidden" type="checkbox" id="menu-toggle" />
//         <div
//           class="hidden lg:flex lg:items-center lg:w-auto w-full lg:ml-auto lg:mr-auto flex-wrap items-center text-base justify-center"
//           id="menu"
//         >
//           <nav class="lg:space-x-12 space-x-0 lg:flex items-center justify-between text-base pt-8 lg:pt-0 lg:space-y-0 space-y-6">
//             <a class="block nav-link active font-medium">
//               <Link href="/" class="block nav-link active font-medium">
//                 Home
//               </Link>
//             </a>
//             <a class="block nav-link">
//               <Link href="/all-data" class="block nav-link">
//                 Lihat Data
//               </Link>
//             </a>
//             <a class="block nav-link">
//               <Link href="/calculate" class="block nav-link">
//                 Calculate
//               </Link>
//             </a>
           
//           </nav>
//         </div>

//         <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
//           <button
//             onClick={handleLogout}
//             class="btn-fill text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 lg:mt-0 bg-purple-600"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Header;
