import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat({ ens }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      message: "Hi",
      mine: true,
    },
    {
      message: "Hello",
      mine: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage() {
    if (newMessage.trim() === "") return;

    // Add the new message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, mine: true },
    ]);

    // Clear the input field after sending the message
    setNewMessage("");
  }

  function processURL(hash) {
    // return hash;
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  useEffect(() => {
    if (!ens) {
      navigate(-1);
    }
  }, []);

  return (
    <main className="w-full h-[88vh] flex flex-col gap-4 flex-1 absolute">
      <div className="flex cursor-pointer p-3 items-center gap-4 border-b border-stone-500/80 ">
        <div className="rounded-full w-10 h-10 overflow-hidden bg-secondary">
          <img
            src={processURL(ens?.image)}
            alt={"GR"}
            className="w-[20px] h-[20px]"
          />
        </div>
        <h1>{ens?.name}</h1>
      </div>
      <div className="flex-1 p-7 w-full h-full flex flex-col gap-4">
        <div className="w-full flex-1 flex flex-col gap-1.5 overflow-y-auto ">
          {messages.map((message, index) => (
            <ChatBubble key={index} {...message} />
          ))}
        </div>

        <div className="h-12  left-[40%] bg-secondary rounded-full flex items-center px-2 absolute bottom-[0]">
          <input
            autoComplete="false"
            className="border h-full py-4 rounded-lg bg-gray-500/50 outline-none"
            placeholder="Send a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="absolute right-3  text-sm rounded-lg p-[0.78rem]  bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-semibold"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

function ChatBubble({ message, mine }) {
  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div className={mine ? "bg-blue-500 text-white" : "bg-gray-300"}>
        <p className="p-2">{message}</p>
      </div>
    </div>
  );
}
