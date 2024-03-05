import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { text } from "stream/consumers";

export const DashboardMain: React.FC = () => {
  return (
    <>
      <div className="relative h-screen">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="./assets/doctor.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4 text-center text-Black">
            WELCOME TO AI DRIVEN VIRTUAL PATIENT
          </h1>
          <h1 className="text-3xl font-bold mb-4 text-center text-Black">
            WITH MEDICINE PROSPECTIVE FOR MEDICAL STUDENT
          </h1>
          <div className="flex justify-center mt-2">
            <Link to="/about">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                ABOUT
              </button>
            </Link>
            <Link to="/feed">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                FAQ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
