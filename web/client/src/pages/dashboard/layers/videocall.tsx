/**
 * @description: Mini Project - MediSynth
 */


import React, { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';

export const VideoCall: React.FC = () => {
    const [stream, setStream] = useState<MediaStream | undefined>(undefined);
    const [callerSignal, setCallerSignal] = useState<string | null>(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [isCaller, setIsCaller] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const myVideo = useRef<HTMLVideoElement>(null);
    const peerVideo = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer.Instance | null>(null);
    const myPeer = useRef<Peer.Instance | null>(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                if (myVideo.current) {
                    myVideo.current.srcObject = stream;
                }
            })
            .catch((err) => console.error('Error accessing media devices: ', err));
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, []);

    const generateCode = async () => {
        try {
            const response = await fetch('/api/generate-code');
            const data = await response.json();
            if (data.code) {
                setGeneratedCode(data.code);
            } else {
                console.error('Error: Code not received from API');
            }
        } catch (error) {
            console.error('Error fetching code from API: ', error);
        }
    };

    const handleCallUser = () => {
        if (stream) {
            const peer = new Peer({ initiator: true, stream });
            peer.on('signal', (data: any) => {
                setIsCaller(true);
                setCallerSignal(JSON.stringify(data));
            });
            peer.on('stream', (stream: any) => {
                if (peerVideo.current) {
                    peerVideo.current.srcObject = stream;
                }
            });
            myPeer.current = peer;
        }
    };
  
    const handleAnswerCall = () => {
      if (stream && callerSignal) {
        const peer = new Peer({ initiator: false, stream });
        peer.on('signal', (data: any) => {
          myPeer.current?.signal(data);
        });
        peer.on('stream', (stream: any) => {
          if (peerVideo.current) {
            peerVideo.current.srcObject = stream;
          }
        });
        peer.signal(JSON.parse(callerSignal));
        myPeer.current = peer;
      }
    };
  
    const handleHangUp = () => {
      myPeer.current?.destroy();
      setCallAccepted(false);
      setIsCaller(false);
      setCallerSignal(null);
    };
  
    const handleMessageSend = () => {
      if (myPeer.current) {
        myPeer.current.send(messageInput);
        setMessages([...messages, `You: ${messageInput}`]);
        setMessageInput('');
      }
    };
  
    return (
      <div>
        <div>
            <video ref={myVideo} autoPlay muted />
            {callAccepted && <video ref={peerVideo} autoPlay />}
            </div>
            <>
                {!callAccepted && !isCaller && (
                    <>
                        <button onClick={handleCallUser}>Call User</button>
                        <input type="text" value={generatedCode} readOnly />
                        <button onClick={generateCode}>Generate Code</button>
                    </>
                )}
            </>
        {/* <div>
          {!callAccepted && !isCaller && (
            <button onClick={handleCallUser}>Call User</button>
          )}
          {!callAccepted && isCaller && (
            <div>
              <p>Waiting for user to answer...</p>
              <button onClick={handleHangUp}>Cancel</button>
            </div>
          )}
          {callerSignal && (
            <div>
              <button onClick={handleAnswerCall}>Answer Call</button>
              <button onClick={handleHangUp}>Decline</button>
            </div>
          )}
        </div> */}
        {callAccepted && (
          <div>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
        )}
      </div>
    );
};

