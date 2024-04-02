import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMessage from "../hook/useSetMessage.js"; // Adjust import to use the correct hook
import useGetMessage from "../hook/useGetMessage.js";

export default function Chat({ ens }) {
  const { setUserMessage } = useMessage(); // Destructure setUserMessage from the hook
  const getMessage = useGetMessage();
  console.log(getMessage);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function processURL(hash) {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  useEffect(() => {
    if (!ens) {
      navigate(-1);
    }
  }, [ens, navigate]); // Add dependencies to useEffect

  const handleRegisterClick = async () => {
    try {
      await setUserMessage(ens?.name, message); // Use ens.name as the username
      setMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Message sending failed:", error);
      // Handle message sending failure, e.g., show an error message
    }
  };

  return (
    <main className="w-full h-[88vh] flex flex-col gap-4 flex-1 absolute">
      <div className="flex cursor-pointer p-3 items-center gap-4 border-b border-stone-500/80 ">
        <div className="rounded-full w-10 h-10 overflow-hidden bg-secondary">
          <img
            src={processURL(ens?.image)}
            alt={"GR"}
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>
        <h1>{ens?.name}</h1>
      </div>
      <div className="bg-red-300">chat:</div>
      <div className="flex-1 p-7 w-full h-full flex flex-col gap-4">
        <div className="w-full flex-1 flex flex-col gap-1.5 overflow-y-auto "></div>

        <div className="h-12  left-[40%] bg-secondary rounded-full flex items-center px-2 absolute bottom-[0]">
          <input
            autoComplete="false"
            className="border h-full py-4 rounded-lg bg-gray-500/50 outline-none"
            placeholder="Send a message"
            value={message} // Use message state for input value
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="absolute right-3  text-sm rounded-lg p-[0.78rem]  bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-semibold"
            onClick={handleRegisterClick}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
