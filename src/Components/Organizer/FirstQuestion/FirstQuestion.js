import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import QuestionContext from "../QuestionContext/QuestionContext";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FirstQuestion = () => {
  const [firstQuestion, setFirstQuestion] = useState();
  const { data, setData } = useContext(QuestionContext);
  const [count, setCount] = useState(0);
  const [option, setOption] = useState();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [cityLocation, setCityLocation] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      questions: data,
      eventName: eventName,
      eventDate: eventDate,
      applicationDeadline: applicationDeadline,
      eventDescription: description,
      cityLocation: cityLocation,
      user: user.email,
    };
    axios
      .post("/event", body)
      .then((data) => {
        console.log(data);
        toast("successfully posted");
      })
      .catch((err) => {
        console.log(err);
        toast("something wrong");
      });
    // Implement your form submission logic here
  };

  console.log(option);
  useEffect(() => {
    const fetchQuestions = async () => {
      await axios
        .get("/question/")
        .then((data) => setFirstQuestion(data.data[count]));
    };
    fetchQuestions();
  }, [count]);
  console.log(data);
  return (
    <div className="text-center my-5">
      <p className="text-2xl">{firstQuestion?.questionName}</p>
      {count <= 3 &&
        firstQuestion?.questionOptions.map((item) => (
          <div>
            <p
              className={`text-xl my-2 p-5 inline-block rounded-full hover:bg-yellow-500 cursor-pointer ${
                option == item ? "bg-yellow-500" : "bg-red-400"
              }`}
              onClick={() => {
                const dataExists = data.some(
                  (data) => data.question === firstQuestion?.questionName
                );

                // If the data exists, update it; otherwise, add it to the array
                const updatedList = dataExists
                  ? data.map((data) =>
                      data.question === firstQuestion?.questionName
                        ? { ...data, answer: item }
                        : data
                    )
                  : [
                      ...data,
                      { question: firstQuestion?.questionName, answer: item },
                    ];
                setData(updatedList);
                setOption(item);
              }}
            >
              {item}
            </p>
          </div>
        ))}
      {count <= 3 && (
        <p className="bg-green-400 inline-block py-2 px-20 rounded-xl text-2xl ">
          <button
            onClick={() => {
              if (count <= 3) {
                setCount(count + 1);
                console.log(count);
              }
            }}
          >
            Next
          </button>
        </p>
      )}
      {count > 3 && (
        <div className="container mx-auto mt-10">
          <h2 className="text-3xl font-bold mb-6">Event Form</h2>
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
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
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
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
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
                type="date"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
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
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
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
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
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
                value={cityLocation}
                onChange={(e) => setCityLocation(e.target.value)}
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

export default FirstQuestion;
