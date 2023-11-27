import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import ArtistSignUp from "./Components/Artist/ArtistSignUp/ArtistSignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/artist-signup" element={<ArtistSignUp></ArtistSignUp>} />
      </Routes>
    </>
  );
}

export default App;
