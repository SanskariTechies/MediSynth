/**
 * @description: Mini Project - MediSynth
 */

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

export const DashboardMedScan: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<string>("");

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageInput(imageSrc);
    } else {
      console.log("Image is not captured.")
    }
  };
  const provideImage = () => {
    if (imageInput) {
      console.log(imageInput);
    }
  }

  const handleToggle = () => {
    setShowWebcam((prev) => !prev);
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageInput(reader.result);
        }
      };
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='relative'>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-3">
        <div className='flex items-center justify-center'>
          <h1 className="mb-4 text-2xl font-semibold text-center">Medicine Scanner</h1>
        </div>
        <div className="flex items-center justify-center mb-4">
          <label className="mr-4 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 text-indigo-600 form-checkbox"
              checked={showWebcam}
              onChange={handleToggle}
            />
            <span className="ml-2 text-gray-700">Use Webcam</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageInputChange}
            ref={fileInputRef}
          />
          <button
            className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
            onClick={handleUploadButtonClick}
          >
            Upload Image
          </button>
        </div>
        <>
          {showWebcam ? (
            <div className="flex-col">
              <div className='flex justify-center'>
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"
                  width={400} height={400} />
              </div>
              <div className='flex justify-center pt-5'>
                <button onClick={captureImage} className="flex px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600" >Capture</button>
              </div>
            </div>
          ) : ( imageInput? (
            <div className="flex-col">
              <div className='flex justify-center'>
                <img
                  src={imageInput}
                  alt="Uploaded Image"
                  className="rounded-lg shadow-md"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                />
              </div>
              <div className='flex justify-center pt-5'>
                <button onClick={provideImage} className="flex px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600" >Submit</button>
              </div>
            </div>
          ): (
            <div className='flex items-center justify-center'>
              <span>No image input</span>
            </div>
          ))}
        </>
      </div>
    </div>
    </div>
    
  );
};
