import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const OrganizerEvent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [event, setEvent] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState();
  const onDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`/event/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount == 1) {
          setDeleteStatus(!deleteStatus);
          toast("Deleted Successfully");
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const fetchEvent = async () => {
      await axios
        .get(`/event/${user.email}`)
        .then((data) => setEvent(data.data))
        .catch((error) => console.log(error));
    };
    fetchEvent();
  }, [user, deleteStatus]);
  console.log(event);
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Event Table</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Event Name</th>
              <th className="py-2 px-4 border-b">Event Date</th>
              <th className="py-2 px-4 border-b">Application Deadline</th>
              <th className="py-2 px-4 border-b">Event Description</th>
              <th className="py-2 px-4 border-b">City Location</th>
              <th className="py-2 px-4 border-b">Questions</th>
              <th className="py-2 px-4 border-b">Delete</th>
            </tr>
          </thead>
          <tbody>
            {event.map((event) => (
              <tr key={event.id}>
                <td className="py-2 px-4 border-b">{event.eventName}</td>
                <td className="py-2 px-4 border-b">{event.eventDate}</td>
                <td className="py-2 px-4 border-b">
                  {event.applicationDeadline}
                </td>
                <td className="py-2 px-4 border-b">{event.description}</td>
                <td className="py-2 px-4 border-b">{event.cityLocation}</td>
                <td className="py-2 px-4 border-b">
                  {
                    /* Render Questions here */
                    event.questions.map((question, index) => (
                      <div key={index}>
                        <p>Question: {question?.question}</p>
                        <p className="text-green-700">
                          Answer: {question?.answer}
                        </p>
                      </div>
                    ))
                  }
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red"
                    onClick={() => onDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrganizerEvent;
