import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ArtistHeader from "../ArtistHeader/ArtistHeader";

const ArtistProfile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [modify, setModify] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      await axios
        .get(`/artist/${user.email}`)
        .then((data) => {
          setArtistDetails(data.data);
          console.log(data);
        })

        .catch((err) => console.log(err));
    };
    fetchArtist();
  }, [user, modify]);

  const [artistDetails, setArtistDetails] = useState([]);
  const [viewProfile, setViewProfile] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [organizerName, setOrganizerName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (organizerName === "" || description === "") {
      toast("not successfull. input name and description");
    }
    if (organizerName && description) {
      console.log(organizerName, user.email);
      await axios
        .put(`/artist/${user.email}`, {
          email: user.email,
          name: organizerName,
          description: description,
        })
        .then((data) => {
          console.log(data);
          if (data.data?.modifiedCount > 0) {
            setModify(!modify);
          }
        });
    }

    // Implement your form submission logic here
  };

  return (
    <div>
      <ArtistHeader></ArtistHeader>
      <div className="two-button flex gap-10 justify-center">
        <p
          className={`p-5 my-2 rounded-full hover:bg-blue-400 ${
            viewProfile ? "bg-blue-400" : " bg-blue-500"
          } `}
        >
          <button
            onClick={() => {
              setViewProfile(true);
              setEditProfile(false);
            }}
          >
            View Profile
          </button>
        </p>
        <p
          className={`p-5 my-2 rounded-full hover:bg-blue-400 ${
            editProfile ? "bg-blue-400" : " bg-blue-500"
          } `}
        >
          <button
            onClick={() => {
              setEditProfile(true);
              setViewProfile(false);
            }}
          >
            Edit Profile
          </button>
        </p>
      </div>
      {viewProfile && (
        <div className="container mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-6">Artist Profile</h2>
          <div className="max-w-md bg-white p-6 rounded-md shadow-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <p className="text-gray-800">{artistDetails?.email}</p>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <p className="text-gray-800">{artistDetails?.name}</p>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <p className="text-gray-800">{artistDetails?.description}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Role
              </label>
              <p className="text-gray-800">{artistDetails?.role}</p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                City
              </label>
              <p className="text-gray-800">{artistDetails?.city}</p>
            </div>
          </div>
        </div>
      )}
      {editProfile && (
        <div className="container mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-6">Artist edit Form</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-md bg-white p-6 rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="name"
                placeholder="Enter your name"
                defaultValue={artistDetails?.name}
                onChange={(e) => setOrganizerName(e.target.value)}
                onFocus={(e) => {
                  setOrganizerName(e.target.value);
                }}
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
                className="w-full px-3 py-2 border rounded-md bg-gray-500 focus:outline-none focus:border-blue-500"
                type="email"
                id="email"
                placeholder="Enter your email"
                readOnly
                defaultValue={artistDetails?.email}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                id="description"
                placeholder="Enter a description"
                defaultValue={artistDetails?.description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ArtistProfile;
