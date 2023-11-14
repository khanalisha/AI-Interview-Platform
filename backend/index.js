const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const app = express();
const { InterviewerQuestion } = require("./routes/interviewRoutes");

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.use(InterviewerQuestion);

app.get("/", (req, res) => {
  res.send("<h1>Start Interview</h1>");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connect now");
    console.log(`server is running port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});


