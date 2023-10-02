// "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./headerweb";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getCookie } from "../utils/cookie";
import { isExpired } from "react-jwt";
import Link from "next/link";

function Register() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const token = getCookie("token");
    console.log("helllo guy login", token);
    if (token || !isExpired(token)) {
      router.push("/");
    } else {
      // Jika tidak ada token, login
      setIsLoading(false);
      router.push("/register");
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const datas = { username, email, password };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        datas
      );
      toast.success("Berhasil Register ");
      router.push("/login");
    } catch (error) {
      setResponse(error.response.data);
    }
  };

  return (
    // <div className="bg-grey-50 mb-10">
    // <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    //   <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    //     <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //       Register Account
    //     </h2>
    //   </div>

    //   <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    //     <form class="space-y-6" onSubmit={handleRegister}>
    //       <div>
    //         <label class="block text-sm font-medium leading-6 text-gray-900">
    //           Username
    //         </label>
    //         <div class="mt-2">
    //           <input
    //             id="username"
    //             name="username"
    //             type="text"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             required
    //             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>
    //       <div>
    //         <label
    //           for="email"
    //           class="block text-sm font-medium leading-6 text-gray-900"
    //         >
    //           Email address
    //         </label>
    //         <div class="mt-2">
    //           <input
    //             id="email"
    //             name="email"
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <div class="flex items-center justify-between">
    //           <label
    //             for="password"
    //             class="block text-sm font-medium leading-6 text-gray-900"
    //           >
    //             Password
    //           </label>
    //           <div class="text-sm">
    //             {/* <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
    //           </div>
    //         </div>
    //         <div class="mt-2">
    //           <input
    //             id="password"
    //             name="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             type="password"
    //             autocomplete="current-password"
    //             required
    //             class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //           />
    //         </div>
    //       </div>
    //       {response && (
    //         <p class="mt-1 text-center text-xs text-red-500">
    //           {response.error}
    //         </p>
    //       )}
    //       <div>
    //         <button
    //           type="submit"
    //           class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Register
    //         </button>
    //       </div>
    //     </form>
    //     <p class="mt-10 text-center text-sm text-gray-500">
    //       already have an account?
    //       <Link
    //         href="/login"
    //         class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
    //       >
    //         Login
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <div>
      <style scoped>
        {`
.content-4-2 .input {
  border: 1px solid #292738;
  background-color: #252332;
  color: #d8d7df;
  transition: 0.3s;
}

.content-4-2 .input:focus-within {
  border: 1px solid #2ec49c;
  color: #d8d7df;
  transition: 0.3s;
}

.content-4-2 .input input::placeholder {
  color: #4e4b62;
  transition: 0.3s;
}

.content-4-2 .input:focus-within input::placeholder {
  color: #d8d7df;
  outline: none;
  transition: 0.3s;
}

.content-4-2 .input:focus-within .icon path {
  transition: 0.3;
  fill: #2ec49c;
  transition: 0.3s;
}

.content-4-2 .input .icon-toggle path {
  transition: 0.3;
  fill: #2ec49c;
  transition: 0.3s;
}

.content-4-2 .centered {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.content-4-2 .width-left {
  width: 0%;
}

.content-4-2 .width-right {
  width: 100%;
}

.content-4-2 .forgot-password {
  color: #737182;
  transition: 0.3s;
}

.content-4-2 .forgot-password:hover {
  color: #d8d7df;
}

.content-4-2 .btn-fill {
  background-image: linear-gradient(
    rgba(91, 203, 173, 1),
    rgba(39, 194, 153, 1)
  );
}

.content-4-2 .btn-fill:hover {
  background-image: linear-gradient(#2ec49c, #2ec49c);
}

.content-4-2 .bg-medium-black-1 {
  background-color: #211f2d;
}

.content-4-2 .bg-medium-black-2 {
  background-color: #252332;
}

.content-4-2 .text-gray {
  color: #737182;
}

.content-4-2 .text-green {
  color: #2ec49c;
}

.content-4-2 .text-medium-white {
  color: #d8d7df;
}

@media (min-width: 1024px) {
  .content-4-2 .width-left {
    width: 48%;
  }

  .content-4-2 .width-right {
    width: 52%;
  }
}`}
      </style>
      <div className="content-4-2 flex flex-col items-center h-full lg:flex-row">
        <div className="relative hidden lg:block h-full width-left">
          <img
            className="absolute object-fill centered"
            src="http://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content3/Content-3-11.png"
            alt=""
          />
        </div>
        <div className="flex w-full h-full px-8 width-right sm:px-16 py-32 lg:mx-0 mx-auto items-left justify-left bg-medium-black-1">
          <div className="w-full sm:w-7/12 md:w-8/12 lg:w-9/12 xl:w-7/12 mx-auto lg:mx-0">
            <div className="items-center justify-center lg:hidden flex">
              <img
                src="http://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content3/Content-3-11.png"
                alt=""
              />
            </div>
            <h3 className="text-3xl font-semibold mb-3 text-medium-white">
              Log In to continue
            </h3>
            <p className="leading-7 text-sm text-gray">
              Create account
              <br />
              registered on the website.
            </p>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="mb-7">
                <label className="block text-lg font-medium text-medium-white">
                  Username
                </label>
                <div className="flex w-full px-5 py-4 mt-3 text-base font-light rounded-xl input">
                  <svg
                    className="mr-4 icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 5C3.34315 5 2 6.34315 2 8V16C2 17.6569 3.34315 19 5 19H19C20.6569 19 22 17.6569 22 16V8C22 6.34315 20.6569 5 19 5H5ZM5.49607 7.13174C5.01655 6.85773 4.40569 7.02433 4.13168 7.50385C3.85767 7.98337 4.02427 8.59422 4.50379 8.86823L11.5038 12.8682C11.8112 13.0439 12.1886 13.0439 12.4961 12.8682L19.4961 8.86823C19.9756 8.59422 20.1422 7.98337 19.8682 7.50385C19.5942 7.02433 18.9833 6.85773 18.5038 7.13174L11.9999 10.8482L5.49607 7.13174Z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full focus:outline-none text-base font-light bg-medium-black-2"
                  />
                </div>
              </div>
              <div className="mb-7">
                <label className="block text-lg font-medium text-medium-white">
                  Email
                </label>
                <div className="flex w-full px-5 py-4 mt-3 text-base font-light rounded-xl input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full focus:outline-none text-base font-light bg-medium-black-2"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-lg font-medium text-medium-white">
                  Password
                </label>
                <div className="flex items-center w-full px-5 py-4 mt-3 text-base font-light rounded-xl input">
                  <svg
                    className="mr-4 icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.81592 4.25974C7.12462 5.48872 7 6.95088 7 8H6C4.34315 8 3 9.34315 3 11V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V11C21 9.34315 19.6569 8 18 8L17 7.99998C17 6.95087 16.8754 5.48871 16.1841 4.25973C15.829 3.62845 15.3194 3.05012 14.6031 2.63486C13.8875 2.22005 13.021 2 12 2C10.979 2 10.1125 2.22005 9.39691 2.63486C8.68058 3.05012 8.17102 3.62845 7.81592 4.25974ZM9.55908 5.24026C9.12538 6.01128 9 7.04912 9 8H15C15 7.04911 14.8746 6.01129 14.4409 5.24027C14.2335 4.87155 13.9618 4.57488 13.6 4.36514C13.2375 4.15495 12.729 4 12 4C11.271 4 10.7625 4.15495 10.4 4.36514C10.0382 4.57488 9.76648 4.87155 9.55908 5.24026ZM14 14C14 14.7403 13.5978 15.3866 13 15.7324V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z"
                      fill="#4E4B62"
                    />
                  </svg>
                  <input
                    // type="password"
                    // name=""
                    // id="password-content-4-2"
                    // placeholder="Your Password"
                    // minlength="6"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full focus:outline-none text-base font-light bg-medium-black-2"
                    required
                  />
                </div>
              </div>
              {/* <div className="mt-3 text-right">
                <a href="#" className="forgot-password text-sm italic">
                  Forgot Password?
                </a>
              </div> */}
              <button
                type="submit"
                className="btn-fill block w-full px-4 py-3 mt-9 font-medium text-xl text-white transition duration-500 ease-in-out transform rounded-xl hover:bg-gray-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
              >
                Register
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-gray">
              Already have an account ?
              <a href="#" className="font-medium hover:underline text-green">
                Login Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
