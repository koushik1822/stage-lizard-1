import React, { useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";
const ArtistSignUp = () => {
  const [artistName, setArtistName] = useState("");
  const [category, setCategory] = useState("solo");
  const [primaryGenre, setPrimaryGenre] = useState("");
  const [additionalGenres, setAdditionalGenres] = useState([]);
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [loggedUser, loggedLoading, loggedError] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();
  console.log(loggedUser);
  let from = location.state?.from?.pathname || "/";
  console.log(user);
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (loggedUser) {
    navigate("/artist-dashboard");
  }
  const handleAdditionalGenreSelect = (selectedGenre) => {
    if (!additionalGenres.includes(selectedGenre)) {
      setAdditionalGenres([...additionalGenres, selectedGenre]);
    }
  };

  const handleRemoveAdditionalGenre = (genreToRemove) => {
    setAdditionalGenres(
      additionalGenres.filter((genre) => genre !== genreToRemove)
    );
  };

  // Filter out selected genres from the dropdown options
  const availableGenres = ["jazz", "blues", "country"].filter(
    (genre) => !additionalGenres.includes(genre)
  );

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      navigate(from, { replace: true });

      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  return (
    <div>
      {" "}
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Artist Signup</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="artistName"
            >
              Artist Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="artistName"
              placeholder="Enter your artist name"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="category"
                  value="solo"
                  checked={category === "solo"}
                  onChange={() => setCategory("solo")}
                />
                <span className="ml-2">Solo</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="category"
                  value="band"
                  checked={category === "band"}
                  onChange={() => setCategory("band")}
                />
                <span className="ml-2">Band</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Primary Music Genre
            </label>
            <select
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              value={primaryGenre}
              onChange={(e) => setPrimaryGenre(e.target.value)}
              required
            >
              <option value="" disabled>
                Select primary music genre
              </option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="hiphop">Hip Hop</option>
              {/* Add more genres as needed */}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Additional Music Genres (multiple selectable)
            </label>
            <select
              multiple
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handleAdditionalGenreSelect(e.target.value)}
            >
              {availableGenres.map((genre) => (
                <>
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                </>
              ))}
            </select>

            <div className="mt-2">
              {additionalGenres.map((genre) => (
                <div>
                  {" "}
                  <button
                    key={genre}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded-md my-2"
                    onClick={() => handleRemoveAdditionalGenre(genre)}
                  >
                    {genre}
                  </button>
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => handleRemoveAdditionalGenre(genre)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="city"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            type="submit"
          >
            Sign Up
          </button>
          <p className="mt-4">
            ALready have an account?{" "}
            <Link to="/artist-login" className="text-blue-500">
              Login Here
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default ArtistSignUp;
