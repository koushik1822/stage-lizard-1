import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const OrganizerGig = () => {
  const [gig, setGig] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [trackGig, setTrackGig] = useState(false);
  useEffect(() => {
    const fetchGig = async () => {
      await axios
        .get(`/gig/${user.email}`)
        .then((data) => {
          //   console.log(data.data);
          setGig(data.data);
        })
        .catch((err) => console.log(err));
    };
    fetchGig();
  }, [user, trackGig]);
  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`/gig/delete/${id}`)
      .then((data) => {
        console.log(data.data);
        if (data.data == "successfully deleted") {
          toast("successfully deleted");
          setTrackGig(!trackGig);
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(gig);
  return (
    <div>
      {gig?.length > 0 && (
        <div>
          <div className="container mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6">Gig Table</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Number of Acts</th>
                  <th className="py-2 px-4 border-b">Live Act</th>
                  <th className="py-2 px-4 border-b">DJ</th>
                  <th className="py-2 px-4 border-b">Music Genre</th>
                  <th className="py-2 px-4 border-b">Fee</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Venue</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Services</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gig.map((gig, index) => (
                  <tr key={gig.id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[0]?.numberOfActs}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[0]?.liveAct == true ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[0]?.dj == true ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[0]?.musicGenre}
                    </td>
                    <td className="py-2 px-4 border-b">{gig?.gig[1]?.fee}</td>
                    <td className="py-2 px-4 border-b">{gig?.gig[2]?.date}</td>
                    <td className="py-2 px-4 border-b">{gig?.gig[2]?.venue}</td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[3]?.description}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {gig?.gig[4]?.service}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red"
                        onClick={() => handleDelete(gig._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {gig?.length == 0 && (
        <div className="text-3xl flex justify-center items-center align-middle h-screen">
          <p>No gigs found</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrganizerGig;
