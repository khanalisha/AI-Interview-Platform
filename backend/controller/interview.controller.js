const express = require("express");
const uuid = require("uuid");
require("dotenv").config();
const { OpenAI } = require("openai");
const Interview = require("../model/interview");
const apiKey = process.env.APIKEY;

const openai = new OpenAI({ apiKey: apiKey });
const startingPrompt = {
  MERN: "Hi, let's start the interview for MERN .First ask the one question wait for user response if user response then give the feedback .Ask then another question .",
  JAVA: "Hi, let's start the interview for JAVA",
};
const UpdateInterviewPrompt = `Give me a question according to MERN. Provide one question at a time. If the user responds, go to the next question.`;
const endInterviewPrompt = `Stop the interview.Give the feedback  base on my answer and do not give single line or single word feedback only give feedback sentance  base on the feefback Schema :{
  improvementAreas:[{type:String}],
  overallScore:[{type:Number}]
}`;

//Token

const generateSessionToken = () => {
  return uuid.v4();
};
//Token

const startInterview = async (req, res, next) => {
  const { type } = req.body;
  const sessionToken = generateSessionToken();
  // console.log(sessionToken);

  // console.log(type);
  try {
    const conversation = [{ role: "user", content: startingPrompt[type] }];
    // console.log(conversation);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });

    const question = response.choices[0].message.content;
    const newinterview = new Interview({
      sessionToken,
      type: type,
      conversation: [...conversation, { role: "assistant", content: question }],
      feedback: null,
    });
    await newinterview.save();
    // console.log(question);
    console.log(response.choices, "object1");
    console.log(question, "object2");
    // console.log(newinterview, "object3");
    res
      .status(200)
      .json({ msg: "Interview Is Started Now", question, newinterview });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const UpdateInterview = async (req, res, next) => {
  const { sessionToken, conversation, type } = req.body;

  console.log(sessionToken, conversation);
  try {
    // const userResponse = conversation[conversation.length - 1].content;
    // const UpdateInterviewPrompt = `give me question  accoording to ${conversation}.Give 1 question at a time if user response then go to the next question  `;

    const userResponse = conversation[conversation.length - 1].content;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...conversation,
        { role: "user", content: UpdateInterviewPrompt },
      ],
    });
    console.log(response.choices, "bb");
    const nextQuestion = response.choices[0].message.content;
    console.log(nextQuestion, "cc");
    const updatedInterview = await Interview.findOneAndUpdate(
      { sessionToken },
      { $push: { conversation: { role: "assistant", content: nextQuestion } } },
      { new: true }
    );

    res.status(200).json({
      msg: "Next question retrieved",
      nextQuestion,
      UpdateInterviewPrompt,
      updatedInterview,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const EndInterview = async (req, res, next) => {
  const { conversation } = req.body;
  console.log(conversation, "blah");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...conversation,
        { role: "user", content: endInterviewPrompt },
      ],
    });
    const endObj = response.choices[0].message.content;
    res
      .status(200)
      .json({ msg: "Interview is stopped now", endObj, endInterviewPrompt });
    console.log(response.choices);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const AiResponse = async (req, res, next) => {
  try {
    const { conversation } = req.body;
    console.log(conversation);
    let response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversation,
    });
    console.log(response);
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  endInterviewPrompt,
  startingPrompt,
  EndInterview,
  startInterview,
  UpdateInterview,
  AiResponse,
};
