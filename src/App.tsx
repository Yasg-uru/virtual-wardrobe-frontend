import { Routes, Route } from "react-router-dom";

import Home from "./pages/mainpages/Home";
import Navbar from "./pages/mainpages/Navbar";
import Tabcomponent from "./pages/authcomponents/Tabcomponent";
import Login from "./pages/authcomponents/Login";
import Verify from "./pages/authcomponents/VerifyComponent";
import ClothDetail from "./pages/Cloths/ClothDetails";
import AddCloth from "./pages/Cloths/AddCloth";
import Collections from "./pages/Cloths/Collections";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Tabcomponent />} />

        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/detail/:id" element={<ClothDetail />} />
        <Route path="/add" element={<AddCloth />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </>
  );
};

export default App;
