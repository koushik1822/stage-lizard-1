// ArtistHeader.js

import React, { useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";

const ArtistHeader = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [signOut, loading, error] = useSignOut(auth);
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
          Stage Lizard
        </Link>

        <nav className="space-x-4">
          <Link to="/dashboard" className="text-white">
            Dashboard
          </Link>
          <Link to="/portfolio" className="text-white">
            Portfolio
          </Link>
          <Link to="/events" className="text-white">
            Events
          </Link>
          <Link to="/messages" className="text-white">
            Messages
          </Link>
        </nav>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none"
          >
            <span className="mr-2">Artist Name</span>
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
                to="/profile"
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
