import { configWeb3Modal } from "./connection";

import Header from "./components/Header";
import Form from "./components/Form";
import { Route, Routes, useNavigate } from "react-router-dom";
import Chat from "./components/Chat";
import useGetENS from "./hook/useGetName";
import { useEffect } from "react";

//web3 Modal configuration function call
configWeb3Modal();
function App() {
  const navigate = useNavigate();
  const ens = useGetENS();

  useEffect(() => {
    if (ens) {
      navigate("/chat");
    }
  }, [ens, navigate]);
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Form />} />
        <Route path="/chat" element={<Chat ens={ens} />} />
      </Routes>
    </>
  );
}

export default App;
