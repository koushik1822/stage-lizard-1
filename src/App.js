import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import ArtistSignUp from "./Components/Artist/ArtistSignUp/ArtistSignUp";
import ArtistLogin from "./Components/Artist/ArtistLogin/ArtistLogin";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import ArtistDashboard from "./Components/Artist/ArtistDashboard/ArtistDashboard";
import axios from "axios";
import OrganizerSignUp from "./Components/Organizer/OrganizerSignUp/OrganizerSignUp";
import OrganizerLogin from "./Components/Organizer/OrganizerLogin/OrganizerLogin";
import OrganizerDashboard from "./Components/Organizer/OrganizerDashboard/OrganizerDashboard";
import RequireAuthOrganizer from "./Components/RequireAuth/RequireAuthOrganizer";
import FirstQuestion from "./Components/Organizer/FirstQuestion/FirstQuestion";
import QuestionContextProvider from "./Components/Organizer/QuestionContext/QuestionContextProvider";
import SecondQuestion from "./Components/Organizer/SecondQuestion/SecondQuestion";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/";
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>} />
        <Route path="/artist-signup" element={<ArtistSignUp></ArtistSignUp>} />
        <Route path="/artist-login" element={<ArtistLogin></ArtistLogin>} />
        <Route
          path="/organizer-signup"
          element={<OrganizerSignUp></OrganizerSignUp>}
        />
        <Route
          path="/organizer-login"
          element={<OrganizerLogin></OrganizerLogin>}
        />
        <Route
          path="/artist-dashboard"
          element={
            <RequireAuth>
              <ArtistDashboard></ArtistDashboard>
            </RequireAuth>
          }
        />
        <Route
          path="/organizer-dashboard"
          element={
            <RequireAuthOrganizer>
              <QuestionContextProvider>
                <OrganizerDashboard></OrganizerDashboard>
              </QuestionContextProvider>
            </RequireAuthOrganizer>
          }
        >
          <Route
            path="first-question"
            element={
              <RequireAuthOrganizer>
                <QuestionContextProvider>
                  <FirstQuestion></FirstQuestion>
                </QuestionContextProvider>
              </RequireAuthOrganizer>
            }
          ></Route>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
