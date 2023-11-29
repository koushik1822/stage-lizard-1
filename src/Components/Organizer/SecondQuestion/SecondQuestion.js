import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import QuestionContext from "../QuestionContext/QuestionContext";

const SecondQuestion = () => {
  const [firstQuestion, setFirstQuestion] = useState();
  const { data, setData } = useContext(QuestionContext);
  const [option, setOption] = useState();
  console.log(data);
  useEffect(() => {
    const fetchQuestions = async () => {
      await axios
        .get("/question/")
        .then((data) => setFirstQuestion(data.data[1]));
    };
    fetchQuestions();
  }, []);

  return (
    <div className="text-center my-5">
      <p className="text-2xl">{firstQuestion?.questionName}</p>
      {firstQuestion?.questionOptions.map((item) => (
        <div>
          <p
            className={`text-xl my-2 p-5 inline-block rounded-full hover:bg-yellow-500 cursor-pointer ${
              option == item ? "bg-yellow-500" : "bg-red-400"
            }`}
            onClick={() => setOption(item)}
          >
            {item}
          </p>
        </div>
      ))}
      <p className="bg-green-400 inline-block py-2 px-20 rounded-xl text-2xl ">
        <button
          disabled={!option && true}
          onClick={() => {
            console.log("hello");
            if (option) {
              setData([
                ...data,
                { questionName: firstQuestion?.questionName, answer: option },
              ]);
            }
          }}
        >
          Next
        </button>
      </p>
    </div>
  );
};

export default SecondQuestion;
