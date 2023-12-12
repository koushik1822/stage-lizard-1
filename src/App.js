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
import OrganizerEvent from "./Components/Organizer/OrganizerEvent/OrganizerEvent";
import OrganizerProfile from "./Components/Organizer/OrganizerProfile/OrganizerProfile";
import Gig from "./Components/Organizer/Gig/Gig";
import OrganizerGig from "./Components/Organizer/OrganizerGig/OrganizerGig";
import ArtistEvent from "./Components/Artist/ArtistEvent/ArtistEvent";
import ArtistSingleEvent from "./Components/Artist/ArtistSingleEvent/ArtistSingleEvent";
import ArtistBookedEvent from "./Components/Artist/ArtistBookedEvent/ArtistBookedEvent";
import ArtistProfile from "./Components/Artist/ArtistProfile/ArtistProfile";
import OrganizerBookedArtist from "./Components/Organizer/OrganizerBookedArtist/OrganizerBookedArtist";

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
          path="/artist-event"
          element={
            <RequireAuth>
              <ArtistEvent></ArtistEvent>
            </RequireAuth>
          }
        />
        <Route
          path="/artist-profile"
          element={
            <RequireAuth>
              <ArtistProfile></ArtistProfile>
            </RequireAuth>
          }
        />
        <Route
          path="/booked-event"
          element={
            <RequireAuth>
              <ArtistBookedEvent></ArtistBookedEvent>
            </RequireAuth>
          }
        />

        <Route
          path="/artist-event/:id"
          element={
            <RequireAuth>
              <ArtistSingleEvent></ArtistSingleEvent>
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
          <Route
            path="organizer-event"
            element={
              <RequireAuthOrganizer>
                <OrganizerEvent></OrganizerEvent>
              </RequireAuthOrganizer>
            }
          ></Route>
          <Route
            path="organizer-profile"
            element={
              <RequireAuthOrganizer>
                <OrganizerProfile></OrganizerProfile>
              </RequireAuthOrganizer>
            }
          ></Route>
          <Route
            path="organizer-gig"
            element={
              <RequireAuthOrganizer>
                <Gig></Gig>
              </RequireAuthOrganizer>
            }
          ></Route>
          <Route
            path="gig"
            element={
              <RequireAuthOrganizer>
                <OrganizerGig></OrganizerGig>
              </RequireAuthOrganizer>
            }
          ></Route>
        </Route>
        <Route
          path="/organizer-booked-artist"
          element={
            <RequireAuthOrganizer>
              
                <OrganizerBookedArtist></OrganizerBookedArtist>
              
            </RequireAuthOrganizer>
          }
        />
      </Routes>
    </>
  );
}

export default App;
