import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const OrganizerSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [loggedUser, loggedLoading, loggedError] = useAuthState(auth);
  const [artist, setArtist] = useState();
  const [foundArtist, setFoundArtist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const artistFetch = async () => {
      console.log(email);
      await axios
        .get(`/artist/${email}`)
        .then((data) => {
          setArtist(data?.data);
          setFoundArtist(true);
        })
        .catch((error) => {
          console.log(error);
          setFoundArtist(false);
        });
    };

    artistFetch();
  }, [email]);
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
    const organizerFinder = async () => {
      await axios
        .get(`/organizer/${loggedUser.email}`)
        .then((data) => navigate("/organizer-dashboard"))
        .catch((err) => {
          navigate("/artist-dashboard");
          console.log(err);
        });
    };
    organizerFinder();
  }

  const handleSignup = async (e) => {
    // Implement your signup logic here
    e.preventDefault();
    if (!foundArtist) {
      console.log("hello organizer");
      try {
        const response = await createUserWithEmailAndPassword(email, password);
        console.log(response);
        if (response.user.email) {
          await axios.post("/organizer/organizer-signup", {
            name: organizerName,
            email: email,
          });
          navigate("/organizer-dashboard");
        }

        console.log("User signed up successfully!");
      } catch (error) {}
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Organizer Signup</h2>
      <form onSubmit={handleSignup}>
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="organizerName"
          >
            Organizer Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="organizerName"
            placeholder="Enter organizer name"
            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={foundArtist && true}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Sign Up
        </button>
        <p className="mt-4">
          ALready have an account?{" "}
          <Link to="/organizer-login" className="text-blue-500">
            Login Here
          </Link>
          .
        </p>
        <div className="found-artist">
          {foundArtist && "This email is for an artist"}
        </div>
      </form>
    </div>
  );
};

export default OrganizerSignUp;
