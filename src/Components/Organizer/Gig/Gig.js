import React, { useState } from "react";
import "./gig.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
const Gig = () => {
  const sidePanel = [
    "1. Wanted:Artists",
    "2. Fee",
    "3. Date and venue",
    "4. Description",
    "5. Services",
    "6. Save and publish Gig",
  ];
  const [gigDetails, setGigDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [numberOfActs, setNumberOfActs] = useState("");
  const [liveAct, setLiveAct] = useState(false);
  const [dj, setDj] = useState(false);
  const [musicGenre, setMusicGenre] = useState("");
  const [origin, setOrigin] = useState("");
  const [fee, setFee] = useState();
  const [venue, setVenue] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [service, setService] = useState();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (count == 0) {
      console.log(numberOfActs, liveAct, dj, musicGenre, origin);
      const body = {
        formName: "Wanted: Artists",
        numberOfActs: numberOfActs,
        liveAct: liveAct,
        dj: dj,
        musicGenre: musicGenre,
        origin: origin,
      };
      setGigDetails([body]);
      setCount(count + 1);
    }
    if (count == 1) {
      console.log(fee);
      const body = {
        formName: "Fee",
        fee: fee,
      };
      setGigDetails([...gigDetails, body]);
      setCount(count + 1);
    }
    if (count == 2) {
      const body = {
        formName: "Date and venue",
        venue: venue,
        date: date,
      };
      setGigDetails([...gigDetails, body]);
      setCount(count + 1);
    }
    if (count == 3) {
      const body = {
        formName: "Description",
        description: description,
      };
      setGigDetails([...gigDetails, body]);
      setCount(count + 1);
      console.log(gigDetails);
    }
    if (count == 4) {
      const body = {
        formName: "Services",
        service: service,
      };
      setGigDetails([...gigDetails, body]);
      setCount(count + 1);
    }
  };
  const publishGig = async (e) => {
    e.preventDefault();
    await axios
      .post("/gig", { gig: gigDetails, email: user.email })
      .then((data) => {
        console.log(data.data);
        if (data.data) {
          toast("successfully created gig");
          const timeoutId = setTimeout(
            () => navigate("/organizer-dashboard"),
            3000
          );

          // Clean up the timeout when the component unmounts or when needed
          return () => clearTimeout(timeoutId);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex justify-center">
      <div className="flex gap-10">
        <div className="side-panel">
          {sidePanel.map((item, index) => (
            <div
              key={index}
              className={`border-b ${
                count == index ? "bg-slate-500" : " bg-slate-400"
              } `}
            >
              <p className="my-2 p-2">{item}</p>
            </div>
          ))}
        </div>
        <div className="form-part">
          {count == 0 && (
            <div className>
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label htmlFor="">Number of acts wanted</label>
                <input
                  onChange={(e) => setNumberOfActs(e.target.value)}
                  type="number"
                  required
                />
                <label htmlFor="">Category</label> <br />
                <div className="mt-[-20px]">
                  <input
                    onChange={() => setLiveAct(!liveAct)}
                    type="checkbox"
                    id="live-act"
                    value="Live act"
                  />
                  <label for="live-act">Live act</label> <br />
                  <input
                    onChange={() => setDj(!dj)}
                    type="checkbox"
                    id="dj"
                    value="dj"
                  />
                  <label for="dj">DJ</label>
                </div>
                <label htmlFor="">Music Genre</label>
                <input
                  onChange={(e) => setMusicGenre(e.target.value)}
                  type="text"
                  required
                />
                <label htmlFor="">Origin</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="Everywhere" selected>
                    Everywhere
                  </option>
                  <option value="venue+100km">Venue + 100km</option>
                  <option value="venue+200km">Venue + 200km</option>
                  <option value="venue+300km">Venue + 300km</option>
                </select>
                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Apply and Next
                </button>
              </form>
            </div>
          )}
          {count == 1 && (
            <div className>
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label htmlFor="">Artist fee </label>
                <input
                  onChange={(e) => setFee(e.target.value)}
                  type="number"
                  required
                />

                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Apply and Next
                </button>
              </form>
            </div>
          )}
          {count == 2 && (
            <div className>
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label htmlFor="">Venue </label>
                <input
                  onChange={(e) => setVenue(e.target.value)}
                  type="text"
                  required
                />
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  required
                />

                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Apply and Next
                </button>
              </form>
            </div>
          )}
          {count == 3 && (
            <div className>
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label htmlFor="">Description of the event </label>
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                />

                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Apply and Next
                </button>
              </form>
            </div>
          )}
          {count == 4 && (
            <div className>
              <form
                className="flex flex-col items-start"
                onSubmit={handleSubmit}
              >
                <label htmlFor="">Put your services you will provide </label>
                <input
                  onChange={(e) => setService(e.target.value)}
                  className="h-20"
                  type="text"
                  required
                />

                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Apply and Next
                </button>
              </form>
            </div>
          )}
          {count == 5 && (
            <div className>
              <form className="flex flex-col items-start" onSubmit={publishGig}>
                <button className="bg-blue-400 p-2 my-5" type="submit">
                  Publish
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Gig;
