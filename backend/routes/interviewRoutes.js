const express = require("express");
const controller = require("../controller/interview.controller");
const InterviewerQuestion = express.Router();

InterviewerQuestion.post("/gpt", controller.AiResponse);
InterviewerQuestion.post("/interview/start", controller.startInterview);
InterviewerQuestion.post("/interview/end", controller.EndInterview);
InterviewerQuestion.patch("/update", controller.UpdateInterview);

module.exports = {
  InterviewerQuestion,
};
