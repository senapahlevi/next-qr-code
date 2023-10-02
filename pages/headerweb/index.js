import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Headerweb() {
  const [open, setOpen] = useState(false);
  return (
    // nav bar
    <div>
      <div className="header-2-2">
        <header>
          <div className="mx-auto flex py-12 lg:px-24 md:px-16 sm:px-8 px-8 items-center justify-between lg:justify-start">
            <a href="#" onClick={() => setOpen(!open)}>
              <img
                src="http://api.elements.buildwithangga.com/storage/files/2/assets/Header/Header2/Header-2-5.png"
                alt=""
              />
            </a>
            <div
              className="flex mr-0 lg:hidden cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onclick
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
            {open && (
              <div
                className="bg-black fixed w-full hidden h-full top-0 left-0 z-30 bg-opacity-60"
                onClick={() => setOpen(false)}
              ></div>
            )}
            <nav
              className={`navigation lg:mr-auto  lg:flex flex-col text-base justify-center z-50 fixed top-8 left-3 right-3 p-8 rounded-md shadow-md bg-white lg:flex lg:flex-row lg:relative lg:top-0 lg:shadow-none lg:bg-transparent lg:p-0 lg:items-center items-start  ${
                open ? "flex" : "hidden"
              }`}
            >
              <a href="#">
                <img
                  className="m-0 lg:hidden mb-3"
                  src="http://api.elements.buildwithangga.com/storage/files/2/assets/Header/Header2/Header-2-5.png"
                  alt=""
                />
              </a>
              <a
                className="nav-text text-lg font-semibold leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative active"
                href="/"
              >
                Home
              </a>
              <a
                className="nav-text text-lg font-light leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative"
                href="#"
              >
                Pricing
              </a>
              <a
                className="nav-text text-lg font-light leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative"
                href="#"
              >
                About Us
              </a>

              <svg
                onClick={() => setOpen(!open)}
                className="w-6 h-6 absolute top-4 right-4 lg:hidden cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </nav>
            <div className="hidden lg:inline-flex">
              <a
                className="nav-text text-lg font-light leading-6 mx-0 lg:mx-5 my-4 lg:my-0 relative"
                href="/login"
              >
                <button className="inline-flex text-black font-light text-lg leading-7 py-3 px-8 focus:outline-none">
                  Log In
                </button>
              </a>
              <button className="btn-try inline-flex text-white text-lg leading-7 py-3 px-8 rounded-xl focus:outline-none hover:shadow-lg font-semibold">
                Try Now
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
export default Headerweb;
