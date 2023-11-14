import React, { useState } from "react";
import axios from "axios";
import { Logic } from "./Logic";
import { useNavigate } from "react-router-dom";

const Interview: React.FC = () => {
  const [isMicrophoneAllowed, setIsMicrophoneAllowed] = useState(false);
  const [isCameraAllowed, setIsCameraAllowed] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [candidateStream, setCandidateStream] = useState<MediaStream | null>(
    null
  );
  const [isMicrophoneMuted, setIsMicrophoneMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const navigate = useNavigate();

  const handleAllowMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicrophoneAllowed(true);
      setCandidateStream(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleAllowCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraAllowed(true);
      setCandidateStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleShareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setIsScreenShared(true);
      setCandidateStream(screenStream);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const handleStopShare = () => {
    if (candidateStream && isScreenShared) {
      const tracks = candidateStream.getTracks();
      tracks.forEach((track) => track.stop());
      setCandidateStream(null);
      setIsScreenShared(false);

      handleAllowCamera();
    }
  };

  const handleToggleMicrophone = () => {
    if (candidateStream) {
      const audioTracks = candidateStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isMicrophoneMuted;
      });
      setIsMicrophoneMuted(!isMicrophoneMuted);
    }
  };

  const handleToggleCamera = () => {
    if (candidateStream) {
      const videoTracks = candidateStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleEndInterview = () => {
    if (candidateStream) {
      candidateStream.getTracks().forEach((track) => track.stop());
      setCandidateStream(null);
      setIsMicrophoneAllowed(false);
      setIsCameraAllowed(false);
      setIsScreenShared(false);
    }
    navigate("/");
  };

  return (
    <div>
      <div className="flex h-400">
        {/* Left side - Interviewer */}
        <div className="flex-1 p-4 border border-solid border-gray-700 bg-gray-300 h-[400px] border border-red-500 m-auto justify-center items-center  ">
          <h2 className="text-xl font-bold">Interviewer</h2>
          {/* Add Interviewer components */}
          {/* Display local image for the interviewer */}
          <div className="flex justify-center items-center m-auto mt-[100px]">
            <div className="bg-blue-500 p-8 rounded-full m-auto">
              {/* <div className="w-16 h-16 flex items-center justify-center text-white text-2xl font-bold"> */}
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mt-4 animate-ping">
                AI
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 border border-solid border-gray-900 bg-gray-300">
          <h2 className="text-xl font-bold">Candidate</h2>
          {!isMicrophoneAllowed && (
            <button
              className="btn-allow-microphone"
              onClick={handleAllowMicrophone}
            >
              Allow Microphone
            </button>
          )}
          {!isCameraAllowed && (
            <button className="btn-allow-camera" onClick={handleAllowCamera}>
              Allow Camera
            </button>
          )}

          {/* Display Candidate's Local Camera Video or Screen Share */}
          {isMicrophoneAllowed && (isCameraAllowed || isScreenShared) && (
            <div>
              <video
                className="w-full mt-4 h-[200px]"
                autoPlay
                playsInline
                ref={(videoRef) => {
                  if (videoRef) videoRef.srcObject = candidateStream;
                }}
              />
            </div>
          )}

          {/* Display start interview message */}
          {isMicrophoneAllowed &&
            (isCameraAllowed || isScreenShared) &&
            !candidateStream && (
              <p>
                Microphone and Camera are allowed. You can start the interview.
              </p>
            )}

          {/* Buttons for full functionality */}
          {isMicrophoneAllowed &&
            (isCameraAllowed || isScreenShared) &&
            candidateStream && (
              <div className="mt-4 space-x-2">
                <button
                  className={`btn-toggle-microphone bg-${
                    isMicrophoneMuted ? "red" : "green"
                  }-500 text-white hover:bg-[grey] border border-black-500 bg-black py-2 px-4 rounded-md`}
                  onClick={handleToggleMicrophone}
                >
                  {isMicrophoneMuted ? "Unmute Microphone" : "Mute Microphone"}
                </button>
                <button
                  className={`btn-toggle-camera bg-${
                    isCameraOff ? "red" : "green"
                  }-500 text-white bg-black hover:bg-[grey] py-2 px-4  rounded-md`}
                  onClick={handleToggleCamera}
                >
                  {isCameraOff ? "Turn Off Camera" : "Turn On Camera"}
                </button>
                {isScreenShared ? (
                  <button
                    className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
                    onClick={handleStopShare}
                  >
                    Stop Share
                  </button>
                ) : (
                  <button
                    className="btn-share-screen hover:bg-[grey] border border-black-500 bg-black text-white py-2 px-4 rounded-md border border-black-500"
                    onClick={handleShareScreen}
                  >
                    Share Screen
                  </button>
                )}
                <button
                  className="btn-end-interview bg-red-700 text-white py-2 px-4 rounded-md"
                  onClick={handleEndInterview}
                >
                  End Interview
                </button>
              </div>
            )}
        </div>
      </div>
      <div>
        <Logic />
      </div>
    </div>
  );
};

export default Interview;
