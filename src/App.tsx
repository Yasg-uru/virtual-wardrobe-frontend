import { Routes, Route } from "react-router-dom";

import Home from "./pages/mainpages/Home";
import Navbar from "./pages/mainpages/Navbar";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
