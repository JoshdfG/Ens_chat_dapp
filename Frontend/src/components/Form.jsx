import { useState } from "react";
import useRegister from "../hook/useRegister";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const registerUser = useRegister();
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  // const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadImage = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
              pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
            },
          }
        );

        const fileUrl = response.data.IpfsHash;
        // setImage(fileUrl); // Set the image URL obtained from Pinata
        // console.log(fileUrl);
        return fileUrl;
      } catch (error) {
        console.log("Pinata API Error:", error);
      }
    }
  };

  const handleRegisterClick = async () => {
    try {
      const cid = await uploadImage(); // Ensure the image is uploaded and URL is set
      await registerUser.registerENs(username, cid);
      // navigate("/chat"); // Navigate to /chat upon successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration failure, e.g., show an error message
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="border-[.5px] p-4 py-10 rounded-md backdrop-blur-lg mt-40 bg-black/40 border-gray-400 w-[300px] md:w-[400px] mx-auto justify-center flex">
        <div className="avatar"></div>
        <div>
          <div>
            <p className="text-center font-bold mb-2">Enter your Username</p>
            <form action="">
              <input
                className="p-2 mx-auto border flex justify-center rounded-full w-[80px] h-[80px] active:border-none outline-none bg-blue-200/20 "
                type="file"
                onChange={handleFileChange}
              />
              <input
                className="p-2 rounded-sm w-full active:border-none outline-none bg-blue-200/20 mt-2"
                type="text"
                placeholder="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </form>
          </div>
          <div className="text-center">
            <button
              className="mt-2 bg-blue-600 w-full p-2 rounded-md hover:bg-blue-700 active:border-none"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
