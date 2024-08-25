import React, { useState, useEffect } from 'react';
import './style.css';

const Evaluate = () => {
  const [fetchedDiseaseName, setFetchedDiseaseName] = useState('');
  const [enteredDiseaseName, setEnteredDiseaseName] = useState('');
  const [prescribedMedicine, setPrescribedMedicine] = useState('');
  const [evaluationResult, setEvaluationResult] = useState('');
  const [message, setMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [messageCompleted, setMessageCompleted] = useState(false);

  useEffect(() => {
    console.log("Fetching data...");
    fetchPreEvaluationData();
  }, []);

  useEffect(() => {
    if (startButtonClicked && message?.length > 0) {
      const interval = setInterval(() => {
        setMessageIndex(prevIndex => {
          if (prevIndex >= message.length) {
            clearInterval(interval);
            setMessageCompleted(true); 
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [startButtonClicked, message]);

  const fetchPreEvaluationData = () => {
    fetch("http://localhost:8000/api/v1/video/pre-evaluation")
      .then(response => response.json())
      .then(data => {
        setMessage(data[1]);
        setFetchedDiseaseName(data[0]);
        console.log(data[0]);
        console.log(data[1]);
      })
      .catch(error => console.error("Error fetching pre-evaluation data:", error));
  };

  const speakMessage = (text:string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const checkDiseaseName = () => {
    if (enteredDiseaseName === fetchedDiseaseName) {
      setEvaluationResult("Correct");
    } else {
      setEvaluationResult("Incorrect");
    }
  };

  const evaluateMedicine = () => {
    fetch("http://localhost:8000/api/v1/evaluation/evaluate", {
      method: "POST",
      body: JSON.stringify({ disease: fetchedDiseaseName, medicine: prescribedMedicine }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setEvaluationResult(data.result ? "True" : "False");
      })
      .catch(error => console.error("Error evaluating medicine:", error));
  };

  const handleStartButtonClick = () => {
    setStartButtonClicked(true);
    setTimeout(() => {
      speakMessage(message);
    }, 100); 
  };

  return (
    <div>
      <div className="box" style={{ width: "900px", height: "500px" }}>
        <div className="cartoon">
          <div className="shoulders"></div>
          <div className="hair-back"></div>
          <div className="neck"></div>
          <div className="ear"></div>
          <div className="ear"></div>
          <div className="face">
            <div className="nose"></div>
            <div className="mouth">
              {startButtonClicked && !messageCompleted ? (
                <div className="semicircle"></div>
              ) : (
                <div className="line"></div>
              )}
            </div>
            <div className="eye">
              <div className="pupil"></div>
              <div className="eye-bright"></div>
            </div>
            <div className="eye">
              <div className="pupil"></div>
              <div className="eye-bright"></div>
            </div>
            <div className="eyebrow"></div>
            <div className="eyebrow"></div>
          </div>
          <div className="forehead"></div>
          <div className="hair-front-1"></div>
          <div className="hair-front-1"></div>
          <div className="hair-front-2"></div>
          <div className="hair-front-2"></div>
          <div className="hair-front-3"></div>
          <div className="hair-front-3"></div>
          <div className="hair-bangs"></div>
          <div className="shirt-neck"></div>
          <div className="shirt-neck"></div>
        </div>
      </div>
      {!startButtonClicked && (
        <>
      <button
        onClick={handleStartButtonClick}
        style={{ padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '300px', marginLeft: "430px", marginBottom: "50px" }}
      >
        Start
      </button>
      </>
      )}

      {startButtonClicked && (
        <>
          <p style={{ fontFamily: 'Arial', fontSize: '16px', lineHeight: '1.5', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            Message:
            <span style={{ fontWeight: 'bold', color: 'black' }}>
            {message?.substring(0, messageIndex)}
            </span>
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '45%' }}>
              <input
                type="text"
                placeholder="Enter disease name"
                value={enteredDiseaseName}
                onChange={e => setEnteredDiseaseName(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
              />
              <button
                onClick={checkDiseaseName}
                style={{ padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Check Disease Name
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '45%' }}>
              <input
                type="text"
                placeholder="Enter prescribed medicine"
                value={prescribedMedicine}
                onChange={e => setPrescribedMedicine(e.target.value)}
                style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
              />
              <button
                onClick={evaluateMedicine}
                style={{ padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Evaluate Medicine
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <p style={{ fontSize: '16px', marginBottom: "20px" }}>
              Result: <span style={{ fontWeight: 'bold', color: evaluationResult === "Correct" || evaluationResult === "True" ? 'green' : 'red' }}>
                {evaluationResult}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Evaluate;
