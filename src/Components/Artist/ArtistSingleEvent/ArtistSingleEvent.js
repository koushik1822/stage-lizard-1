import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const ArtistSingleEvent = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState();
  const [user, loading, error] = useAuthState(auth);
  //   console.log(id);
  useEffect(() => {
    const fetchEvent = async () => {
      await axios
        .get(`/event/single-event/${id}`)
        .then((data) => setEventDetails(data.data))
        .catch((err) => console.log(err));
    };
    fetchEvent();
  }, []);
  const handleApply = async () => {
    await axios
      .post("/book", {
        eventId: id,
        bookedBy: user?.email,
      })
      .then((data) => {
        console.log(data);
        if (data.data == "you already booked") {
          toast("you already booked");
        } else {
          toast("successfully booked");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(eventDetails);
  return (
    <div>
      <ArtistHeader></ArtistHeader>
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center ">
          {eventDetails && (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              {/*  <img
            className="w-full h-40 object-cover"
            src={event.image}
            alt={eventDetails?.eventName}
          /> */}

              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {eventDetails?.eventName}
                </div>
                <p className="text-gray-700 text-base mb-2">
                  <strong>Location:</strong> {eventDetails?.cityLocation}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <strong>Date:</strong> {eventDetails?.eventDate}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <strong>Event Time:</strong> {eventDetails?.eventStartTime}-
                  {eventDetails?.eventEndTime}
                </p>
                <p className="text-gray-700 text-base mb-2">
                  <strong>Application Deadline:</strong>{" "}
                  {eventDetails?.applicationDeadline}
                </p>
                {/* Add more details as needed */}
              </div>

              <div className="px-6 py-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ArtistSingleEvent;
