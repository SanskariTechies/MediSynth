/**
 * @description: Mini Project - MediSynth
*/

import React, { useState, useEffect } from "react";

const VideoComponent = () => {
  const [videoSource, setVideoSource] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const handleSubmit = (e: any) => {
    setIsOpen(false);
  };
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    setVideoSource("https://www.pexels.com/download/video/4100465/");
    setTranscript("Your RPG game talking text here...");
  }, []);
  return (
    <div className="relative h-screen">
      <div>
        <video
          className="object-cover w-full h-full"
          autoPlay loop playsInline src={videoSource}
        />
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="p-8 bg-white rounded w-96">
            <form>
              <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name the disease
                  </label>
                  <input type="text" id="disease" name="disease" value={formData.disease} onChange={handleChange}
                    className="block w-full mt-1 border-gray-300 rounded-md form-input" />
              </div>
              <button onClick={handleSubmit} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                  Close
              </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 text-black bg-gray-200">
        <p className="mb-5 text-lg font-bold">{transcript}</p>
        <div>
          <p className="mb-2 text-lg">Do you know the disease?</p>
          <div className="flex justify-between">
            <input className="items-start p-2 ml-5 text-xl text-gray-800 rounded" type="text"/>
            <button className="flex items-end p-4 text-right text-white bg-green-600 rounded-lg" 
                onClick={() => setIsOpen(true)}>
                Do you want some test result?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Thermometer = () => {
  const [temperature, setTemperature] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTemperature = parseInt(e.target.value);
    if (!isNaN(newTemperature)) {
      setTemperature(newTemperature);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="relative mb-5">
        {/* Thermometer */}
        <div className="relative w-8 h-64 bg-gray-200">
          {/* Thermometer liquid */}
          <div
            style={{ height: `${temperature}%` }}
            className="absolute bottom-0 left-0 right-0 bg-red-500"
          ></div>
          {/* Thermometer bulb */}
          <div
            style={{ bottom: `${temperature}%` }}
            className="absolute left-0 right-0 w-8 h-8 bg-gray-100 border border-gray-400 rounded-full"
          ></div>
          {/* Thermometer scale */}
          <div className="absolute bottom-0 w-full h-4 bg-gray-300">
            <div
              style={{ height: `${temperature}%` }}
              className="h-full bg-gray-500"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Evaluate: React.FC = () => {
  return (
    <div className="relative">
      <VideoComponent />
      {/* <Thermometer /> */}
    </div>
  );
}