// static/pages/index.js (Next.js app)
import React, { useState } from "react";
import axios from "axios";
import Header from "../headerweb";
import Headerweb from "../../pages/headerweb";
import Hero from "../hero";
import Footer from "../footer";

export default function Generate() {
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
       <Hero />
     </div>
    // <div className="container">
    //   <Headerweb />
    //   <h1>QR Code Generator</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="text">Text</label>
    //       <input
    //         type="text"
    //         id="text"
    //         value={text}
    //         onChange={(e) => setText(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="link">Link</label>
    //       <input
    //         type="url"
    //         id="link"
    //         value={link}
    //         onChange={(e) => setLink(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Generate</button>
    //   </form>
    //   {image && <img src={image} alt="QR code" width={200} height={200} />}
    //   {error && <div>{error} woy</div>}
    // </div>
  );
}
