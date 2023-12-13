import React, { useEffect, useState } from "react";
import ArtistHeader from "../ArtistHeader/ArtistHeader";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
const ArtistEvent = () => {
  const [event, setEvent] = useState([]);
  const [searchInput, setSearchInput] = useState(false);
  const [city, setCity] = useState();
  const [track, setTrack] = useState(false);
  const dayFilter = ["all", 7, 30];


  /* unit testing to take place */

  useEffect(() => {
    const eventFetch = async () => {
      await axios
        .get("/event/")
        .then((data) => {
          setEvent(data.data);
          console.log(data.data);
        })
        .catch((err) => console.log(err));
    };
    eventFetch();
  }, [track]);
  /* useEffect(() => {
    // Filter events based on city location from req.params
    console.log(city);
    const cityFilter = city?.toLowerCase();
    const filtered = event.filter((event) =>
      event.cityLocation.toLowerCase().startsWith(cityFilter)
    );
    console.log(filtered);
    setEvent(filtered);
  }, [city]); */
  useEffect(() => {
    const eventMultipleFetch = async () => {
      if (city !== "") {
        await axios
          .get(`/event/multiple-event/${city}`)
          .then((data) => {
            if (data.data !== "no events found on that location") {
              setEvent(data.data);
            }
          })
          .catch((err) => console.log(err));
      } else {
        setTrack(!track);
      }
    };
    eventMultipleFetch();
  }, [city]);

  const handleFilter = async (difference) => {
    if (difference == "all") {
      await axios
        .get("/event/")
        .then((data) => {
          setEvent(data.data);
          console.log(data.data);
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .get(`/event/event-difference/${difference}`)
        .then((data) => setEvent(data.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <ArtistHeader></ArtistHeader>
      <div className="container mx-4 mt-10 flex justify-end items-center gap-5">
        <div className="filter-date">
          {
            <select
              onChange={(e) => handleFilter(e.target.value)}
              name=""
              id=""
              className="border-orange-50 border p-2"
            >
              {dayFilter.map((day) =>
                isNaN(day) ? (
                  <option value={"all"} selected>
                    All
                  </option>
                ) : (
                  <option value={day}>Upcoming {day} Days</option>
                )
              )}
            </select>
          }
        </div>
        {searchInput ? (
          <div className="flex align-middle items-center">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              type="text"
              id="inputBox"
              placeholder="Search by location..."
              onChange={(e) => setCity(e.target.value)}
            />
            <span
              onClick={() => setSearchInput(!searchInput)}
              className="text-lg hover:cursor-pointer"
            >
              {" "}
              &#128270;
            </span>
          </div>
        ) : (
          <div
            className="text-2xl hover:cursor-pointer"
            onClick={() => setSearchInput(!searchInput)}
          >
            &#128270;
          </div>
        )}
      </div>
      <div className="container mx-auto mt-10 grid grid-cols-3">
        {event.length > 0 &&
          event.map((event) => (
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
