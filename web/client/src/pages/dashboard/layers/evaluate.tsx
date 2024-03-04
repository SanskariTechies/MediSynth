/**
 * @description: Mini Project - MediSynth
*/

import React, { useState } from "react";


interface VideoProps {
  src: string;
}

export const VideoComponent: React.FC<VideoProps> = ({ src }) => {
  return (
    <div className="relative h-screen">
      <video
        className="object-cover w-full h-full"
        autoPlay
        loop
        muted
        playsInline
        src={src}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white">Your RPG game talking text here...</span>
      </div>
    </div>
  );
};


export const Thermometer: React.FC = () => {
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
      {/* Progress bar */}
      <input
        type="range"
        min="0"
        max="100"
        value={temperature}
        onChange={handleChange}
        className="w-64 h-10 overflow-hidden bg-gray-200 rounded-full outline-none appearance-none"
      />
      <div className="mt-2 text-gray-600">Temperature: {temperature}°C</div>
    </div>
  );
};