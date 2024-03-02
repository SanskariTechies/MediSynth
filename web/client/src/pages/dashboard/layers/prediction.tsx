

// import React, { useState } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';


// export const Prediction: React.FC = () => {
//     const [recognizedText, setRecognizedText] = useState('');
//     const [typedText, setTypedText] = useState('');
//     const [uploadedImage, setUploadedImage] = useState(null);
  
//     const webcamRef = React.useRef(null);
  
//     const capture = React.useCallback(() => {
//       const imageSrc = webcamRef.current.getScreenshot();
//       performOCR(imageSrc);
//     }, [webcamRef]);
  
//     const handleInputChange = (event: any) => {
//       setTypedText(event.target.value);
//     };
  
//     const handleFileChange = (event: any) => {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setUploadedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     };
  
//     const handleSubmit = () => {
//       setRecognizedText(typedText);
//     };
  
//     const performOCR = (imageSrc: any) => {
//       Tesseract.recognize(
//         imageSrc,
//         'eng', // Language: English
//         { logger: (m) => console.log(m) } // Logger function
//       ).then(({ data: { text } }) => {
//         setRecognizedText(text);
//       });
//     };
  
//     return (
//       <div style={{ margin: "400px", marginTop: "50px" }}>
//         <h1 style={{ color: "white" }}>OCR with Camera Access</h1>
  
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             width={400}
//             height={400}
//           />
//         </div>
  
//         <div>
//           <button style={{ backgroundColor: "white", margin: "10px" }} onClick={capture}>Capture</button>
//           <input type="file" accept="image/*" onChange={handleFileChange} style={{ margin: "10px" }} />
//         </div>
//   <br></br>
//         <div>
//           <h2 style={{ color: "white" }}>Recognized Text:</h2>
//           <p style={{ color: "white" }}>{recognizedText}</p>
//         </div>
//   <br></br>
//         <div>
//           <h2 style={{ color: "white" }}>Type Medical Prescription:</h2>
//           <textarea rows={2} cols={50} value={typedText} onChange={handleInputChange} />
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <button style={{ backgroundColor: "green", margin: "10px" }} onClick={handleSubmit}>Submit</button>
//           </div>
//         </div>
  
        
//       </div>
//     );
// };

import React, { useRef, useState } from 'react';

type Props = {
    onCapture: (imageData: string) => void;
};
  
export const Prediction: React.FC<Props> = ({ onCapture }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
  
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setIsStreaming(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };
  
    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
        setIsStreaming(false);
      }
    };
  
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/png');
          onCapture(imageData);
        }
      }
    };
  
    return (
      <div>
        {isStreaming ? (
          <>
            <button onClick={stopCamera}>Stop Camera</button>
            <button onClick={captureImage}>Capture Image</button>
            <video ref={videoRef} width={400} height={300} autoPlay muted style={{ display: 'block' }} />
            <canvas ref={canvasRef} width={400} height={300} style={{ display: 'none' }} />
          </>
        ) : (
          <button onClick={startCamera}>Start Camera</button>
        )}
      </div>
    );
};
