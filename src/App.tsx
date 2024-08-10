import { Routes, Route } from "react-router-dom";

import Home from "./pages/mainpages/Home";
import Navbar from "./pages/mainpages/Navbar";
import Tabcomponent from "./pages/authcomponents/Tabcomponent";
import Login from "./pages/authcomponents/Login";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Tabcomponent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
