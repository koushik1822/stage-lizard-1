import React from "react";
import { Link } from "react-router-dom";
import bgImage from "./Image/bg.jpg";
const Homepage = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Stage Lizard</h1>
          <p className="text-lg">Explore and discover amazing things!</p>
          <Link to="/artist-signup">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow my-2">
              Sign Up As Artist
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
