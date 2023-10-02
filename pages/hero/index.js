import React, { useState } from "react";
import styles from "../../styles/Hero.module.css"; // Import file CSS
import axios from "axios";

function Hero() {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the backend API to generate and save the QR code
      const response = await axios
        .post(
          "http://localhost:8080/api/qr-generate",
          {
            text: text,
            text_url: link,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const imageBlob = new Blob([res.data]);
          const url = URL.createObjectURL(imageBlob);
          setImage(url);
        })
        .catch((error) => {
          // Error handling here
          console.error(error);
        });

      // Set the image state to display the QR code
    } catch (error) {
      // setError(error);
      console.error(error);
    }
  };

  return (
    
    <div>
      <section className={`subscribe ${styles["subscribe"]} `}>
        <main className={` subscribe bg-gradient ${styles["bg-gradient"]} h-96`}>
          <div
            className={`px-4 mx-auto max-w-xl lg:px-24 ${styles["py-72"]} py-12`}
          >
            <h1
              className={`font-semibold leading-snug text-center text-black-1 md:leading-9 ${styles["text-subscribe"]}`}
            >
              Generate
            </h1>
            <p
              className={`mt-2 mb-16 text-sm font-normal text-center text-white-1 md:mt-5 md:text-xl`}
            >
              Generate your QR Code 100% free and easy
            </p>
            <form onSubmit={handleSubmit} className={`mx-auto w-px442`}>
              <label
                htmlFor="email"
                className={`grid grid-cols-12 gap-1 p-3 bg-white rounded-xl`}
              >
                <div className={`flex col-span-8 py-2`}>
                  {/* mail icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="#569B9B"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 6L12 13L2 6"
                      stroke="#569B9B"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    id="text"
                    onChange={(e) => setText(e.target.value)}
                    placeholder="input your text/link web to generate qr code"
                    className={`w-full ml-2 text-sm font-semibold placeholder-green-700 focus:outline-none md:text-base text-darkTosca`}
                  />
                </div>
                <div className={`col-span-4 text-right`}>
                  <button
                    type="submit"
                    className={`px-2 py-2 text-base font-semibold text-center rounded-lg text-white-2 gradient-button md:px-4`}
                  >
                    Generate 
                  </button>
                </div>
              </label>
            </form>
          </div>
        </main>
        <div className=" mx-auto max-w-screen-small">
          {image && <img src={image} alt="QR code" width={200} height={200} />}
        </div>
      </section>
    </div>
  );
}

export default Hero;
