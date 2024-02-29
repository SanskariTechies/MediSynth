

// import React, { useState } from 'react';
import React, { useState, useRef } from 'react';
interface WebcamCaptureProps {
  width: number;
  height: number;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ width, height }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgData, setImgData] = useState<string | null>(null);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImgData(dataUrl);
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width, height, position: 'relative' }}>
        <video ref={videoRef} width={width} height={height} autoPlay muted playsInline />
        {imgData && (
          <img src={imgData} alt="Captured" style={{ position: 'absolute', top: 0, left: 0, width, height }} />
        )}
        <button onClick={handleCapture} style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}>
          Capture
        </button>
      </div>
    </div>
  );
};



export const Prediction = () => {
    return (<div style={{ width: '100vw', height: '100vh' }}>
      <WebcamCapture width={640} height={480} />
    </div>);

    /*
    const [recognizedText, setRecognizedText] = useState('');
    const [typedText, setTypedText] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
  
    const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      performOCR(imageSrc);
    }, [webcamRef]);
  
    const handleInputChange = (event) => {
      setTypedText(event.target.value);
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    };
  
    const handleSubmit = () => {
      setRecognizedText(typedText);
    };
  
    const performOCR = (imageSrc) => {
      Tesseract.recognize(
        imageSrc,
        'eng', // Language: English
        { logger: (m) => console.log(m) } // Logger function
      ).then(({ data: { text } }) => {
        setRecognizedText(text);
      });
    };
  
    return (
      <div style={{ margin: "400px", marginTop: "50px" }}>
        <h1 style={{ color: "white" }}>OCR with Camera Access</h1>
  
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={400}
            height={400}
          />
        </div>
  
        <div>
          <button style={{ backgroundColor: "white", margin: "10px" }} onClick={capture}>Capture</button>
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ margin: "10px" }} />
        </div>
  <br></br>
        <div>
          <h2 style={{ color: "white" }}>Recognized Text:</h2>
          <p style={{ color: "white" }}>{recognizedText}</p>
        </div>
  <br></br>
        <div>
          <h2 style={{ color: "white" }}>Type Medical Prescription:</h2>
          <textarea rows="2" cols="50" value={typedText} onChange={handleInputChange} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button style={{ backgroundColor: "green", margin: "10px" }} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
  
        
      </div>
    );
    */
};