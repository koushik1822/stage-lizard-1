import React, { useEffect, useState } from "react";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

const ArtistBookedEvent = () => {
  const [bookedEvents, setBookedEvents] = useState();
  const [bookedEventDetails, setBookedEventDetails] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [deleteTrack, setDeleteTrack] = useState(false);
  useEffect(() => {
    const fetchBooking = async () => {
      await axios
        .get(`/book/${user.email}`)
        .then((data) => {
          console.log(data.data);
          setBookedEvents(data.data[0]);
          setBookedEventDetails(data.data[1]);
        })
        .catch((err) => console.log(err));
    };
    fetchBooking();
  }, [user, deleteTrack]);
  const onDelete = async (id) => {
    console.log(id);
    const details = { user: user.email, id: id };
    await axios
      .delete("/book", { params: details })
      .then((data) => {
        console.log(data);
        if (data.data?.deletedCount > 0) {
          toast("deleted");
          setDeleteTrack(!deleteTrack);
        } else {
          toast("not deleted");
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(bookedEvents);
  console.log(bookedEventDetails);
  return (
    <div>
      <ArtistHeader></ArtistHeader>
      {bookedEventDetails?.length > 0 && (
        <div className="container mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-4">Event Table</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Event Name</th>
                <th className="py-2 px-4 border-b">Event Location</th>
                <th className="py-2 px-4 border-b">Event Description</th>
                <th className="py-2 px-4 border-b">Event Date</th>
                <th className="py-2 px-4 border-b">Event Host</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedEventDetails.map((event, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{event.eventName}</td>
                  <td className="py-2 px-4 border-b">{event.cityLocation}</td>
                  <td className="py-2 px-4 border-b">
                    {event.eventDescription}
                  </td>
                  <td className="py-2 px-4 border-b">{event.eventDate}</td>
                  <td className="py-2 px-4 border-b">{event.user}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red"
                      onClick={() => onDelete(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ArtistBookedEvent;
