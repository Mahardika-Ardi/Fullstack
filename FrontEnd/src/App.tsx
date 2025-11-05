import { BrowserRouter, Route, Routes } from "react-router-dom";

import LogIn from "./Component/LogIn.tsx";
import SignUp from "./Component/SignUp.tsx";
import Home from "./Component/Home.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
