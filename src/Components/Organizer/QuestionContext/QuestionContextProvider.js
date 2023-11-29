// MyContextProvider.js

import React, { useState } from "react";

import QuestionContext from "./QuestionContext";

const QuestionContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <QuestionContext.Provider value={{ data, setData }}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContextProvider;
