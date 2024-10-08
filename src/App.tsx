import { Routes, Route } from "react-router-dom";

import Home from "./pages/mainpages/Home";
import Navbar from "./pages/mainpages/Navbar";
import Tabcomponent from "./pages/authcomponents/Tabcomponent";

import Verify from "./pages/authcomponents/VerifyComponent";
import ClothDetail from "./pages/Cloths/ClothDetails";
import AddCloth from "./pages/Cloths/AddCloth";
import Collections from "./pages/Cloths/Collections";
import SerachDetails from "./pages/Cloths/CothDetailBysearch";
import WearAnalysis from "./pages/Cloths/WearAnalysis";
import ForgotPass from "./pages/authcomponents/ForgotPass";
import ResetPass from "./pages/authcomponents/ResetPass";
import Profile from "./pages/authcomponents/Profile";
import RequireAuth from "./helper/RequireAuth";
import Support from "./pages/mainpages/Support";
import GetArchive from "./pages/Cloths/GetArchive";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Tabcomponent />} />
        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route
          element={
            <RequireAuth 
            // allowedRoles={["User", "Admin", "Moderator"]} 
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Reset-password/:token" element={<ResetPass />} />
          <Route path="/detail/:id" element={<ClothDetail />} />
          <Route path="/add" element={<AddCloth />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/searchDetail/:clothId" element={<SerachDetails />} />
          <Route path="/wear/analysis" element={<WearAnalysis />} />
          <Route path="/support" element={<Support />} />
          <Route path="/archive" element={<GetArchive />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
