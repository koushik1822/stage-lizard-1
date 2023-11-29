import React, { useContext, useEffect, useState } from "react";
import OrganizerHeader from "../OrganizerHeader/OrganizerHeader";
import { Link, Outlet } from "react-router-dom";
import QuestionContext from "../QuestionContext/QuestionContext";

const OrganizerDashboard = () => {
  const { data, setData } = useContext(QuestionContext);
  const [dataUpdate, setDataUpdate] = useState(0);

  useEffect(() => {
    setDataUpdate(1);
  }, [data]);
  console.log(dataUpdate);
  return (
    <>
      <OrganizerHeader></OrganizerHeader>
      <Link to="first-question">
        <p className="p-5 bg-yellow-300 text-center">Publish your call</p>
      </Link>

      <Outlet />
    </>
  );
};

export default OrganizerDashboard;
