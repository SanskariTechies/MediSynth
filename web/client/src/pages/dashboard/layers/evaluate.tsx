/**
 * @description: Mini Project - MediSynth
*/

import React, { useState, useEffect } from "react";

const VideoComponent = () => {
  const [videoSource, setVideoSource] = useState<any>("");
  const [transcript, setTranscript] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  // const [formData, setFormData] = useState<any>({});
  const [medicine, setMedicine] = useState<any>("")
  const [disease, setdisease] = useState<any>("");
  const [userDisease, setUserDisease] = useState<any>("");

  const [right, setRight] = useState<boolean>(false)

  const [error, setError] = useState<any>("")
  const handleSubmit = async (e: any) => {
    if(!(userDisease==disease)) {
      setError("You have analysed it wrongly.")
    } else {
      const response = await fetch(`http://localhost:8000/api/v1/evaluation/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "disease": disease,
          "medicine": medicine
        }),
      });
      const responseData: any = await response.json();
      if(!responseData.success){
        setError(responseData.message)
      } else {
        setRight(true);
      }
    }
  };

  const loaddata = async () => {
    let response=await fetch("http://localhost:8000/api/v1/video/pre-evaluation",{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    });
    const responseData: any =await response.json();
    if(!responseData.success){
      setError(responseData.message)
    } else {
      setVideoSource(responseData.path);
      setTranscript(responseData.transcription);
      setdisease(responseData.disease);
    }
  }
  useEffect(() => {
    setVideoSource("http://localhost:8000/output/result.mp4");
    setTranscript("text goes here...");
  }, []);

  return (
    <div className="relative h-screen">
      {right? (
        <div className="flex items-center">
          <h1 className="text-green-700 text-xl">You have passed.</h1>
        </div>
      ) : (<>
        <div>
          <video
            className="object-cover w-full h-full"
            autoPlay loop playsInline src={videoSource}
          />
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="p-8 bg-white rounded w-96">
                <div className="flex justify-end">
                <button onClick={(e) => {setIsOpen(false)}} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                    Close
                </button>
                </div>
              <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                      Name the medicine
                    </label>
                    <input type="text" id="disease" name="disease" onChange={(e) => {setMedicine(e.target.value)}}
                      className="block w-full p-4 mt-1 border-gray-800 rounded-md form-input" />
                </div>
                <button onClick={handleSubmit} className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                    Submit
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
            {error && (<span className="text-red text-lg">{error}</span>)}
            <div className="flex justify-between">
              <input className="items-start p-2 ml-5 text-xl text-gray-800 rounded" name="userDisease" onChange={(e) => {setUserDisease(e.target.value)}} type="text"/>
              <button className="flex items-end p-4 text-right text-white bg-green-600 rounded-lg" 
                  onClick={() => setIsOpen(true)}>
                  Next
              </button>
            </div>
          </div>
        </div>
      </>)}
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

export const Evaluate: React.FC<any> = () => {
  return (
    <div className="relative">
      <VideoComponent />
      {/* <Thermometer /> */}
    </div>
  );
}