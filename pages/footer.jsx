// "use client";

import Link from "next/link";
import { removeCookie } from "../utils/cookie";
import { useRouter } from "next/router";

function Footer() {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token");
    router.push("/login");
  };
  return (
    <div class="navbar-1-1 mt-5">
      <style scoped>
        {`
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Red+Hat+Display:wght@400;500;600;700&display=swap");

      :root {
          --light-1: #FFFFFF;
          --light-2: #F9FAFE;
          --light-3: #FAFAFD;

          --dark-1: #16171C;
          --dark-2: #494C57;
          --dark-3: #171717;
          --dark-4: #202020;
          --dark-5: #151515;
          --dark-6: #0F0F0F;

          --subtleGrey-1: #F8F8FC;
          --subtleGrey-2: #989DB1;
          --subtleGrey-3: #8D8F98;
          --subtleGrey-4: #9A9A9A;
          --subtleGrey-5: #CED2DE;

          --subtleBlue-1: #34B3FF;
          --subtleBlue-2: #518CFF;
          --subtleBlue-3: #4376DB;
          --subtleBlue-4: #CCE3FF;

          --subtleGreen-1: #00B67A;

          --lemonYellow: #F2FF57;
          --deepGrey: #2E2E2E;
          --navy-1: #313E60;
          --navy-2: #1C3055;
      }

      .font-display {
          font-family: 'Red Hat Display', sans-serif;
      }

      .text-light-1 {
          color: var(--light-1);
      }

      .text-light-2 {
          color: var(--light-2);
      }

      .text-light-3 {
          color: var(--light-3);
      }

      .text-dark-1 {
          color: var(--dark-1);
      }

      .text-dark-2 {
          color: var(--dark-2);
      }

      .text-dark-3 {
          color: var(--dark-3);
      }

      .text-dark-4 {
          color: var(--dark-4);
      }

      .text-dark-5 {
          color: var(--dark-5);
      }

      .text-subtleBlue-1 {
          color: var(--subtleBlue-1);
      }

      .text-subtleBlue-4 {
          color: var(--subtleBlue-4);
      }

      .text-subtleGrey-1 {
          color: var(--ssubtleGrey-1);
      }

      .text-subtleGrey-2 {
          color: var(--subtleGrey-2);
      }

      .text-subtleGrey-3 {
          color: var(--subtleGrey-3);
      }

      .text-subtleGrey-4 {
          color: var(--subtleGrey-4);
      }

      .text-subtleGrey-5 {
          color: var(--subtleGrey-5);
      }

      .bg-light-1 {
          background-color: var(--light-1);
      }

      .bg-light-2 {
          background-color: var(--light-2);
      }

      .bg-light-3 {
          background-color: var(--light-3);
      }

      .bg-dark-6 {
          background-color: var(--dark-6);
      }

      .bg-subtleGreen {
          background-color: var(--subtleGreen-1);
      }

      .bg-subtleGrey-1 {
          background-color: var(--subtleGrey-1);
      }

      .bg-deepGrey {
          background-color: var(--deepGrey);
      }

      .bg-lemonYellow {
          background-color: var(--lemonYellow);
      }

      .bg-navy-1 {
          background-color: var(--navy-1);
      }

      .w-screen-custom {
          width: 1560px;
      }

      .ring-subtleGrey-3 {
          --tw-ring-opacity: 1;
          --tw-ring-color: rgba(141, 143, 152, var(--tw-ring-opacity));
      }

      .text-px20 {
          font-size: 20px;
      }

      .text-px32 {
          font-size: 32px;
      }

      .mb-18 {
          margin-bottom: 72px;
      }

      .ml-18 {
          margin-left: 72px;
      }

      .mt-18 {
          margin-top: 72px;
      }

      .-mt-13 {
          margin-top: -52px;
      }

      .bg-card-professional {
          background: linear-gradient(180deg, #518CFF 0%, #4376DB 100%);
      }
    `}
      </style>
      <footer class="bg-dark-6">
        <div class="max-w-screen-2xl px-4 mx-auto py-14 lg:px-24">
            <div class="grid lg:grid-cols-12">
                <div class="md:col-span-12 lg:col-span-6">
                     <div class="flex flex-row items-center mt-14">
                        <a href="https://www.linkedin.com/in/senapahleviristiawanto">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="mr-6"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0 1.719C0 0.7695 0.789 0 1.7625 0H22.2375C23.211 0 24 0.7695 24 1.719V22.281C24 23.2305 23.211 24 22.2375 24H1.7625C0.789 24 0 23.2305 0 22.281V1.719ZM7.4145 20.091V9.2535H3.813V20.091H7.4145ZM5.6145 7.773C6.87 7.773 7.6515 6.942 7.6515 5.901C7.629 4.8375 6.8715 4.029 5.6385 4.029C4.4055 4.029 3.6 4.839 3.6 5.901C3.6 6.942 4.3815 7.773 5.5905 7.773H5.6145ZM12.9765 20.091V14.0385C12.9765 13.7145 13.0005 13.3905 13.0965 13.1595C13.356 12.513 13.9485 11.8425 14.9445 11.8425C16.248 11.8425 16.7685 12.8355 16.7685 14.2935V20.091H20.37V13.875C20.37 10.545 18.594 8.997 16.224 8.997C14.313 8.997 13.4565 10.047 12.9765 10.7865V10.824H12.9525C12.9605 10.8115 12.9685 10.799 12.9765 10.7865V9.2535H9.3765C9.4215 10.2705 9.3765 20.091 9.3765 20.091H12.9765Z"
                                    fill="#FAFAFD" />
                            </svg>
                        </a>
                      
                        <a href="https://www.instagram.com/sena_.pahlevi11/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="mr-6"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10.9245 2.163H12.0015C15.2055 2.163 15.585 2.1735 16.8495 2.232C18.0195 2.2845 18.6555 2.481 19.0785 2.6445C19.638 2.862 20.0385 3.123 20.4585 3.543C20.8785 3.963 21.138 4.362 21.3555 4.923C21.5205 5.3445 21.7155 5.9805 21.768 7.1505C21.8265 8.415 21.8385 8.7945 21.8385 11.997C21.8385 15.1995 21.8265 15.5805 21.768 16.845C21.7155 18.015 21.519 18.6495 21.3555 19.0725C21.1631 19.5935 20.856 20.0647 20.457 20.451C20.037 20.871 19.638 21.1305 19.077 21.348C18.657 21.513 18.021 21.708 16.8495 21.762C15.585 21.819 15.2055 21.8325 12.0015 21.8325C8.7975 21.8325 8.4165 21.819 7.152 21.762C5.982 21.708 5.3475 21.513 4.9245 21.348C4.40325 21.1559 3.93169 20.8494 3.5445 20.451C3.14513 20.0641 2.83758 19.5925 2.6445 19.071C2.481 18.6495 2.2845 18.0135 2.232 16.8435C2.175 15.579 2.163 15.1995 2.163 11.994C2.163 8.79 2.175 8.412 2.232 7.1475C2.286 5.9775 2.481 5.3415 2.646 4.9185C2.8635 4.359 3.1245 3.9585 3.5445 3.5385C3.9645 3.1185 4.3635 2.859 4.9245 2.6415C5.3475 2.4765 5.982 2.2815 7.152 2.2275C8.259 2.1765 8.688 2.1615 10.9245 2.16V2.163ZM17.8554 4.26461C18.0301 4.19225 18.2174 4.155 18.4065 4.155C18.7884 4.155 19.1547 4.30671 19.4247 4.57677C19.6948 4.84682 19.8465 5.21309 19.8465 5.595C19.8465 5.97691 19.6948 6.34318 19.4247 6.61323C19.1547 6.88329 18.7884 7.035 18.4065 7.035C18.2174 7.035 18.0301 6.99775 17.8554 6.92539C17.6807 6.85302 17.522 6.74695 17.3883 6.61323C17.2545 6.47952 17.1485 6.32077 17.0761 6.14606C17.0037 5.97135 16.9665 5.7841 16.9665 5.595C16.9665 5.4059 17.0037 5.21864 17.0761 5.04394C17.1485 4.86923 17.2545 4.71048 17.3883 4.57677C17.522 4.44305 17.6807 4.33698 17.8554 4.26461ZM9.61347 6.27921C10.3723 5.97523 11.1841 5.82525 12.0015 5.838C13.6193 5.86324 15.1623 6.52363 16.2975 7.67662C17.4326 8.82962 18.0689 10.3827 18.0689 12.0007C18.0689 13.6188 17.4326 15.1719 16.2975 16.3249C15.1623 17.4779 13.6193 18.1383 12.0015 18.1635C11.1841 18.1763 10.3723 18.0263 9.61347 17.7223C8.85459 17.4183 8.16377 16.9664 7.58123 16.3929C6.99868 15.8193 6.53605 15.1356 6.22026 14.3816C5.90448 13.6276 5.74185 12.8182 5.74185 12.0007C5.74185 11.1833 5.90448 10.3739 6.22026 9.61989C6.53605 8.86585 6.99868 8.18216 7.58123 7.60863C8.16377 7.03511 8.85459 6.58319 9.61347 6.27921Z"
                                    fill="#FAFAFD" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12 0C8.7435 0 8.334 0.015 7.0545 0.072C5.775 0.132 4.9035 0.333 4.14 0.63C3.33914 0.931229 2.61374 1.40374 2.0145 2.0145C1.40411 2.61404 0.931661 3.33936 0.63 4.14C0.333 4.902 0.1305 5.775 0.072 7.05C0.015 8.3325 0 8.7405 0 12.0015C0 15.2595 0.015 15.6675 0.072 16.947C0.132 18.225 0.333 19.0965 0.63 19.86C0.9375 20.649 1.347 21.318 2.0145 21.9855C2.6805 22.653 3.3495 23.064 4.1385 23.37C4.9035 23.667 5.7735 23.8695 7.0515 23.928C8.3325 23.985 8.7405 24 12 24C15.2595 24 15.666 23.985 16.947 23.928C18.2235 23.868 19.098 23.667 19.8615 23.37C20.6618 23.0686 21.3867 22.5961 21.9855 21.9855C22.653 21.318 23.0625 20.649 23.37 19.86C23.6655 19.0965 23.868 18.225 23.928 16.947C23.985 15.6675 24 15.2595 24 12C24 8.7405 23.985 8.3325 23.928 7.0515C23.868 5.775 23.6655 4.902 23.37 4.14C23.0684 3.33934 22.5959 2.61401 21.9855 2.0145C21.3864 1.40351 20.661 0.930968 19.86 0.63C19.095 0.333 18.222 0.1305 16.9455 0.072C15.6645 0.015 15.258 0 11.997 0H12ZM10.9245 2.163H12.0015C15.2055 2.163 15.585 2.1735 16.8495 2.232C18.0195 2.2845 18.6555 2.481 19.0785 2.6445C19.638 2.862 20.0385 3.123 20.4585 3.543C20.8785 3.963 21.138 4.362 21.3555 4.923C21.5205 5.3445 21.7155 5.9805 21.768 7.1505C21.8265 8.415 21.8385 8.7945 21.8385 11.997C21.8385 15.1995 21.8265 15.5805 21.768 16.845C21.7155 18.015 21.519 18.6495 21.3555 19.0725C21.1631 19.5935 20.856 20.0647 20.457 20.451C20.037 20.871 19.638 21.1305 19.077 21.348C18.657 21.513 18.021 21.708 16.8495 21.762C15.585 21.819 15.2055 21.8325 12.0015 21.8325C8.7975 21.8325 8.4165 21.819 7.152 21.762C5.982 21.708 5.3475 21.513 4.9245 21.348C4.40325 21.1559 3.93169 20.8494 3.5445 20.451C3.14513 20.0641 2.83758 19.5925 2.6445 19.071C2.481 18.6495 2.2845 18.0135 2.232 16.8435C2.175 15.579 2.163 15.1995 2.163 11.994C2.163 8.79 2.175 8.412 2.232 7.1475C2.286 5.9775 2.481 5.3415 2.646 4.9185C2.8635 4.359 3.1245 3.9585 3.5445 3.5385C3.9645 3.1185 4.3635 2.859 4.9245 2.6415C5.3475 2.4765 5.982 2.2815 7.152 2.2275C8.259 2.1765 8.688 2.1615 10.9245 2.16V2.163Z"
                                    fill="#FAFAFD" />
                                <path
                                    d="M12.0015 7.9995C13.0625 7.9995 14.08 8.42098 14.8303 9.17122C15.5805 9.92146 16.002 10.939 16.002 12C16.002 13.061 15.5805 14.0785 14.8303 14.8288C14.08 15.579 13.0625 16.0005 12.0015 16.0005C10.9405 16.0005 9.92296 15.579 9.17272 14.8288C8.42248 14.0785 8.001 13.061 8.001 12C8.001 10.939 8.42248 9.92146 9.17272 9.17122C9.92296 8.42098 10.9405 7.9995 12.0015 7.9995Z"
                                    fill="#FAFAFD" />
                            </svg>
                        </a>
                    </div>
                    <p class="mt-5 text-base font-normal text-light-3">
                        2023 &nbsp; All rights reserved.
                    </p>
                </div>

        
                {/* <div class="text-xl md:col-span-4 lg:col-span-2">
                    <div class="mb-4 font-bold text-light-3">
                        Payments
                    </div>
                    <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            Collections
                        </a>
                    </div>
                    <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            Conversions
                        </a>
                    </div>
                </div>
                

                <div class="text-xl md:col-span-4 lg:col-span-2">
                    <div class="mb-4 font-bold text-light-3">
                        Resources
                    </div>
                    <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            Blog
                        </a>
                    </div>
                    <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            FAQ
                        </a>
                    </div>
                    <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            Partnerships
                        </a>
                    </div>
                </div> */}

                <div class="text-xl md:col-span-4 lg:col-span-2">
                    <div class="mb-4 font-bold text-light-3">
                        Profiles
                    </div>
                    <div class="mb-4">
                        <a href="https://senapahlevi.github.io/cvsena.github.io/" class="font-normal text-light-3">
                            About Me
                        </a>
                    </div>
                    {/* <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            Careers
                        </a>
                    </div> */}
                    {/* <div class="mb-4">
                        <a href="" class="font-normal text-light-3">
                            News & Media
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    </footer>
   
       
    </div>
  );
}
export default Footer;
