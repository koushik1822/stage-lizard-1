import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import ArtistSignUp from "./Components/Artist/ArtistSignUp/ArtistSignUp";
import ArtistLogin from "./Components/Artist/ArtistLogin/ArtistLogin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import ArtistDashboard from "./Components/Artist/ArtistDashboard/ArtistDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/artist-signup" element={<ArtistSignUp></ArtistSignUp>} />
        <Route path="/artist-login" element={<ArtistLogin></ArtistLogin>} />
        <Route
          path="/artist-dashboard"
          element={
            <RequireAuth>
              <ArtistDashboard></ArtistDashboard>
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
