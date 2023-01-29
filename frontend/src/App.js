import { Route, Routes } from "react-router-dom";
import LoginRegisterPage from "./pages/LoginOrRegisterPage/LoginRegisterPage";
import PetitionsPage from "./pages/PetitionsPage/PetitionsPage";
import StartPetitionPage from "./pages/StartAPetitionPage/StartPetitionPage";
import UserPage from "./pages/UserPage/UserPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import { AuthProvider } from "./contexts/AuthContext";
import PetitionPage from "./pages/PetitionPage/PetitionPage";
import Modal from "./components/Modal/Modal";

function App() {

  document.body.style.overflowX = "hidden";
  window.localStorage.getItem("")

  return (
      <Layout>
        <Modal></Modal>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/start-a-petition" element={<StartPetitionPage />}></Route>
          <Route path="/petitions" element={<PetitionsPage />}></Route>
          <Route path="/user/:userId" element={<UserPage />}></Route>
          <Route path="/petition/:petitionId" element={<PetitionPage/>}></Route>
          <Route path="/login-or-register" element={<LoginRegisterPage />}></Route>
        </Routes>
      </Layout>
  );
}

export default App;
