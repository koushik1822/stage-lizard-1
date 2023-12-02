import React, { useEffect, useState } from "react";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const ArtistEvent = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    const eventFetch = async () => {
      await axios
        .get("/event/")
        .then((data) => {
          setEvent(data.data);
          console.log(event);
        })
        .catch((err) => console.log(err));
    };
    eventFetch();
  }, []);
  return (
    <>
      <ArtistHeader></ArtistHeader>
      <div className="container mx-auto mt-10 grid grid-cols-3">
        {event.map((event) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg mx-4 my-4">
            {/* Event Image (You can replace this with your actual image source) */}
            <img
              className="w-full h-40 object-cover"
              src="https://via.placeholder.com/300"
              alt="Event"
            />

            <div className="px-6 py-4">
              {/* Event Title */}
              <div className="font-bold text-xl mb-2">{event?.eventName}</div>

              {/* Event Details */}
              <p className="text-gray-700 text-base mb-2">
                <strong>Location:</strong> {event?.cityLocation}
              </p>
              <p className="text-gray-700 text-base mb-2">
                <strong>Date:</strong> {event?.eventDate}
              </p>

              {/* Add more details as needed */}

              {/* Apply Button */}
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red mr-2">
                Apply
              </button>
              <Link to={`${event?._id}`}>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red">
                  View More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArtistEvent;
