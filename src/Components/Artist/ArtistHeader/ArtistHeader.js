// ArtistHeader.js

import React, { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";
import axios from "axios";

const ArtistHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
  const [user, loggedLoading, loggedError] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    axios
      .get(`/artist/${user?.email}`)
      .then((data) => setUserDetails(data.data))
      .catch((err) => console.log(err));
  }, [user]);
  const navigate = useNavigate();
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Logging Out...</p>;
  }
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Stage Lizard Artist
        </Link>

        <nav className="space-x-4">
          <Link to="/artist-event" className="text-white">
            Events
          </Link>
          <Link to="/booked-event" className="text-white">
            Booked Events
          </Link>
        </nav>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none"
          >
            {userDetails && <span className="mr-2">{userDetails?.name}</span>}
            <svg
              className={`h-6 w-6 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                to="/artist-profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Settings
              </Link>
              <button
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    alert("You are sign out");
                    navigate("/");
                  }
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ArtistHeader;
