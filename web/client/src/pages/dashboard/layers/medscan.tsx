/**
 * @description: Mini Project - MediSynth
 */

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

export const DashboardMedScan: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [imageInput, setImageInput] = useState<string>("");
  const [error, setError] = useState<any>("")
  const [medicine, setMedicine] = useState<string>("");

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageInput(imageSrc);
      performOCR()
    } else {
      console.log("Image is not captured.")
    }
  };

  const performOCR = async () => {
    try {
      const { data: { text } } = await Tesseract.recognize(imageInput, 'eng');
      const lines = text.split('\n');
      const largeFontMedicines = lines.filter((line: any) => line.length > 8);
      if (!(largeFontMedicines.length > 0)) {
        setError('Medicine name not found');
      } 
      
      try {
        const response = await fetch(`http://localhost:8000/api/v1/model/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'medicine': largeFontMedicines[0]}),
        });
        const responseData: any = await response.json();
        if (response.ok && responseData.success) {
          setMedicine(responseData.medicine);
        } else {
          setError(responseData.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error performing OCR:', error);
      setError('Error performing OCR');
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
          {medicine? (
            <>
              <h1 className="mb-4 text-2xl font-semibold text-center">{medicine}</h1>
            </>
          ) : (
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
              {error && (
                <div className='flex items-center justify-center text-red-700'>
                  <span>${error}</span>
                </div>
              )}
            </>
          </div>
          )}
        </div>
      </div>
  )
};
