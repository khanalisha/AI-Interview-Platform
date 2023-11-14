import React from "react";
import axios from "axios";
import { useState } from "react";

export const Logic = () => {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const startingPrompt = {
    MERN: "Hi, let's start the interview for MERN .First ask the one question wait for user response if user response then give the feedback .Ask then another question .",
    JAVA: "Hi, let's start the interview for JAVA",
  };
  const UpdateInterviewPrompt = `give me question  accoording to startingPrompt.Give 1 question at a time if user response then go to the next question  `;

  const startInterview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/interview/start",
        {
          type: "MERN", // Replace with the actual interview type you want to start
        }
      );

      // Update the conversation with the start message from the server
      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.msg },
        { role: "assistant", content: response.data.question },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStop = async () => {
    try {
      const response = await axios.post("http://localhost:3000/interview/end", {
        conversation: [
          ...conversation,
          { role: "user", content: "endInterviewPrompt" },
        ],
      });

      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.endObj },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    // setInterviewStarted(false);
    try {
      let prompt = startingPrompt && UpdateInterviewPrompt;

      const response = await axios.patch("http://localhost:3000/update", {
        sessionToken: conversation[0]?.sessionToken,
        conversation: [
          ...conversation,
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      setConversation([
        ...conversation,
        { role: "assistant", content: response.data.nextQuestion },
      ]);

      console.log(conversation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    // if (!text.trim() || !interviewStarted) return;

    try {
      const response = await axios.post("http://localhost:3000/gpt", {
        conversation: [...conversation, { role: "user", content: text.trim() }],
      });

      // Update the conversation with the OpenAI response
      setConversation([
        ...conversation,
        { role: "user", content: text.trim() },
        { role: "assistant", content: response.data.answer },
      ]);
      setText(""); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        {conversation.map((iteam, index) => (
          <div key={index} className={iteam.role}>
            {" "}
            <strong>
              {" "}
              {iteam.role.charAt(0).toUpperCase() + iteam.role.slice(1)}:
            </strong>
            {iteam.content}
          </div>
        ))}
      </div>

      <textarea
        rows="4"
        cols="50"
        placeholder="Type your response..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={startInterview}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Start Interview
      </button>
      <button
        onClick={handleSubmit}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Submit
      </button>
      <button
        onClick={handleNext}
        className="btn-stop-share bg-gray-800 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Next Question
      </button>
      <button
        onClick={handleStop}
        className="btn-stop-share bg-red-500 text-white py-2 px-4 rounded-md border border-black-500"
      >
        Stop
      </button>
    </>
  );
};
