// "use client";

import Link from "next/link";

function Header() {
  return (
    <div class="navbar-1-1">
      <div class="container mx-auto flex flex-wrap flex-row items-center justify-between">
       
         
        <label for="menu-toggle" class="cursor-pointer lg:hidden block">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="#092A33"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <input class="hidden" type="checkbox" id="menu-toggle" />
        <div
          class="hidden lg:flex lg:items-center lg:w-auto w-full lg:ml-auto lg:mr-auto flex-wrap items-center text-base justify-center"
          id="menu"
        >
          <nav class="lg:space-x-12 space-x-0 lg:flex items-center justify-between text-base pt-8 lg:pt-0 lg:space-y-0 space-y-6">
            <Link href="/" class="block nav-link active font-medium">
              Home
            </Link>
            <Link href="/all-data" class="block nav-link">
              Lihat Data
            </Link>
            <Link href="/calculate" class="block nav-link">
              Calculate
            </Link>
          </nav>
        </div>

        <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
          <button class="btn-fill text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 lg:mt-0">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;
