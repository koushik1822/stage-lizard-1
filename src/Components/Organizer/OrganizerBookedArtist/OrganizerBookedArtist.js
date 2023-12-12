import React, { useEffect, useState } from "react";
import OrganizerHeader from "../OrganizerHeader/OrganizerHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";

const OrganizerBookedArtist = () => {
  const [user, loading, error] = useAuthState(auth);
  const { email } = user;
  const [bookedEvent, setBookedEvent] = useState();
  useEffect(() => {
    axios
      .get(`organizer/booked-artist/${email}`)
      .then((data) => setBookedEvent(data.data))
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      <OrganizerHeader></OrganizerHeader>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Event Name</th>
              <th className="py-2 px-4 border-b">Event Date</th>
              <th className="py-2 px-4 border-b">Booked By</th>
            </tr>
          </thead>
          <tbody>
            {bookedEvent?.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">
                  {item.eventDetails.eventName}
                </td>
                <td className="py-2 px-4 border-b">
                  {item.eventDetails.eventDate}
                </td>
                <td className="py-2 px-4 border-b">{item.booking.bookedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizerBookedArtist;
