import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",

    transform: "translate(-50%, -50%)",
  },
};
// Modal.setAppElement("#yourAppElement");
const OrganizerEvent = () => {
  const [user, loading, error] = useAuthState(auth);
  const [event, setEvent] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState();
  const [eventName, setEventName] = useState();
  const [eventDate, setEventDate] = useState();
  const [eventStartTime, setEventStartTime] = useState();
  const [eventEndTime, setEventEndTime] = useState();
  const [cityLocation, setCityLocation] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [applicationDeadline, setApplicationDeadline] = useState();
  const [singleEventDetails, setSingleEventDetails] = useState();

  const [modalIsOpen, setIsOpen] = useState(false);

  async function openModal(id) {
    setIsOpen(true);
    console.log(id);
    await axios
      .get(`/event/single-event/${id}`)
      .then((data) => setSingleEventDetails(data.data))
      .catch((err) => console.log(err));
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = singleEventDetails?._id;
    console.log(id);
    const body = {
      eventName: eventName ? eventName : singleEventDetails?.eventName,
      eventDate: eventDate ? eventDate : singleEventDetails?.eventDate,
      eventStartTime: eventStartTime
        ? eventStartTime
        : singleEventDetails?.eventStarttime,
      eventEndTime: eventEndTime
        ? eventEndTime
        : singleEventDetails?.eventEndTime,
      applicationDeadline: applicationDeadline
        ? applicationDeadline
        : singleEventDetails?.applicationDeadline,
      eventDescription: eventDescription
        ? eventDescription
        : singleEventDetails?.eventDescription,
      cityLocation: cityLocation
        ? cityLocation
        : singleEventDetails?.cityLocation,
    };
    console.log(body);
    await axios
      .put(`/event/edit/${id}`, body)
      .then((data) => {
        if (data.data == "edited") {
          toast("succesfully edited");
          setDeleteStatus(!deleteStatus);
          setIsOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="yourAppElement"
      >
        <div className="flex justify-between items-center align-middle">
          <h2 className="text-2xl">Edit Event</h2>
          <button
            onClick={closeModal}
            className="text-xl bg-red-500 p-2 rounded-full w-[40px] h-[40px]"
          >
            X
          </button>
        </div>

        <div className="form-edit w-96">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventName"
              >
                Event Name
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="eventName"
                placeholder="Enter event name"
                defaultValue={singleEventDetails?.eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventDate"
              >
                Event Date
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="date"
                id="eventDate"
                defaultValue={singleEventDetails?.eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventStartTime"
              >
                Event Start Time
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="time"
                id="eventStartTime"
                defaultValue={singleEventDetails?.eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="eventEndTime"
              >
                Event End Time
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="time"
                id="eventEndTime"
                defaultValue={singleEventDetails?.eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="applicationDeadline"
              >
                Application Deadline
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="date"
                id="applicationDeadline"
                defaultValue={singleEventDetails?.applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
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
                placeholder="Enter event description"
                defaultValue={singleEventDetails?.description}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cityLocation"
              >
                City Location
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                type="text"
                id="cityLocation"
                placeholder="Enter city location"
                defaultValue={singleEventDetails?.cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
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
      </Modal>

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
              <th className="py-2 px-4 border-b">Edit</th>
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
                <td className="py-2 px-4 border-b">{event.eventDescription}</td>
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
                    onClick={() => openModal(event._id)}
                  >
                    Edit
                  </button>
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
