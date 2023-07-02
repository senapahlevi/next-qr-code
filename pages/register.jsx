// "use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/register`,
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
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register Account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" onSubmit={handleRegister}>
          <div>
            <label class="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div class="text-sm">
                {/* <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {response && (
            <p class="mt-1 text-center text-xs text-red-500">
              {response.error}
            </p>
          )}
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          already have an account?
          <Link
            href="/login"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
