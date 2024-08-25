// /**
//  * @description: Mini Project - MediSynth
//  */

import React, { useState } from 'react';

const DashboardMedScan = () => {
  const [medicineName, setMedicineName] = useState('');
  const [prescribedMedicine, setPrescribedMedicine] = useState('');
  const [medicineDescription, setMedicineDescription] = useState('');

  const fetchMedicineDescription = () => {
    fetch('http://localhost:8000/api/v1/description/predict_description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ medicine: medicineName })
    })
    .then(response => response.json())
    .then(data => {
      setMedicineDescription(data.medicine);
    })
    .catch(error => console.error('Error fetching medicine description:', error));
  };

  const handleMedicineSubmit = () => {
    fetchMedicineDescription();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Perform image upload to your backend
    // Example: uploadImage(file);
    // Upon successful upload, make API call to get medicine description
    // Example: fetchMedicineDescriptionFromImage(imageUrl);
    // Upon receiving response, update medicineDescription state
  };

  return (
    <div style={{ paddingTop: "100px", textAlign: "center" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter medicine name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "5px", width: "200px" }}
        />
        <button onClick={handleMedicineSubmit} style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Get Medicine Description</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Upload Medicine Image</label>
        
        <button onClick={handleMedicineSubmit} style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" }}>Evaluate Medicine</button>
      </div>

      <div style={{backgroundColor:"black",height:"50px",margin:"6px",borderRadius:"10px",padding:"2px"}}>
        <p style={{ marginTop: "20px",color:"white" }}>Medicine Description: {medicineDescription}</p>
      </div>
    </div>
  );
};

export default DashboardMedScan;





// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';

// export const DashboardMedScan: React.FC = () => {
//   const webcamRef = useRef<Webcam>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [showWebcam, setShowWebcam] = useState<boolean>(false);
//   const [imageInput, setImageInput] = useState<string>("");
//   const [error, setError] = useState<any>("")
//   const [medicine, setMedicine] = useState<string>("");
//   const [desc, setDesc] = useState<any>("")

//   const captureImage = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setImageInput(imageSrc);
//       performOCR()
//     } else {
//       console.log("Image is not captured.")
//     }
//   };

//   const checkMedicine = async () => { 
//     if (medicine) {
//       try {
//         const response = await fetch(`http://localhost:8000/api/v1/description/predict_description`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({'medicine': medicine})
//         });
//         const responseData: any = await response.json();
//         if (response.ok && responseData.success) {
//           setDesc(responseData.medicine);
//         } else {
//           setError(responseData.message);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//   }
//   const performOCR = async () => {
//     try {
//       const { data: { text } } = await Tesseract.recognize(imageInput, 'eng');
//       const lines = text.split('\n');
//       const largeFontMedicines = lines.filter((line: any) => line.length > 8);
//       if (!(largeFontMedicines.length > 0)) {
//         setError('Medicine name not found');
//       } 
      
//       try {
//         const response = await fetch(`http://localhost:8000/api/v1/description/predict_description`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({'medicine': largeFontMedicines[0]}),
//         });
//         const responseData: any = await response.json();
//         if (response.ok && responseData.success) {
//           setDesc(responseData.medicine);
//         } else {
//           setError(responseData.message);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } catch (error) {
//       console.error('Error performing OCR:', error);
//       setError('Error performing OCR');
//     }
//   };


//   const provideImage = () => {
//     if (imageInput) {
//       console.log(imageInput);
//     }
//   }



//   const handleToggle = () => {
//     setShowWebcam((prev) => !prev);
//   };





//   const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         if (typeof reader.result === "string") {
//           setImageInput(reader.result);
//         }
//       };
//     }
//   };

//   const handleUploadButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//       <div className='relative'>
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           {desc? (
//             <>
//               <h1 className="mb-4 text-2xl font-semibold text-center">{desc}</h1>
//             </>
//           ) : (
//             <div className="p-3">
//             <div className='flex items-center justify-center'>
//               <h1 className="mb-4 text-2xl font-semibold text-center">Medicine Scanner</h1>
//             </div>
//             <div className="flex items-center justify-center mb-4">
//               <label className="mr-4 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-5 h-5 text-indigo-600 form-checkbox"
//                   checked={showWebcam}
//                   onChange={handleToggle}
//                 />
//                 <span className="ml-2 text-gray-700">Use Webcam</span>
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageInputChange}
//                 ref={fileInputRef}
//               />
//               <button
//                 className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
//                 onClick={handleUploadButtonClick}
//               >
//                 Upload Image
//               </button>
//             </div>
//             <>
//               {showWebcam ? (
//                 <div className="flex-col">
//                   <div className='flex justify-center'>
//                     <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg"
//                       width={400} height={400} />
//                   </div>
//                   <div className='flex justify-center pt-5'>
//                     <button onClick={captureImage} className="flex px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600" >Capture</button>
//                   </div>
//                 </div>
//               ) : ( imageInput? (
//                 <div className="flex-col">
//                   <div className='flex justify-center'>
//                     <img
//                       src={imageInput}
//                       alt="Uploaded Image"
//                       className="rounded-lg shadow-md"
//                       style={{ maxWidth: "400px", maxHeight: "400px" }}
//                     />
//                   </div>
//                   <div className='flex justify-center pt-5'>
//                     <button onClick={provideImage} className="flex px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600" >Submit</button>
//                   </div>
//                 </div>
//               ): (
//                 <div className='flex items-center justify-center'>
//                   <span>No image input</span>
//                 </div>
//               ))}
//               <div className='flex justify-center flex-col items-center mt-5'>
//               <h1>or</h1>
//               {(medicine && desc) ? (
//                   <p className='text-black text-semibold'>{desc}</p>
//                 ): (
//                   <div className='flex justify-center flex-col items-center'>
//                     <input onChange={(e) => {setMedicine(e.target.value)}} className='p-4 text-black' placeholder='Enter the medicine name'/>
//                     <button
//                       className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
//                       onClick={checkMedicine}>
//                       Check Medicine
//                     </button>
//                   </div>
                  
//                 )
//               }
//               </div>
//               {error && (
//                 <div className='flex items-center justify-center text-red-700'>
//                   <span>${error}</span>
//                 </div>
//               )}
//             </>
//           </div>
//           )}
//         </div>
//       </div>
//   )
// };
