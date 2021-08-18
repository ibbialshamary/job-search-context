const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// execute dotenv
dotenv.config();

// set up server
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://job-search-context.netlify.app"],
    credentials: true,
  })
);

// connect to mongodb
mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB successfully");
    }
  }
);

// set up routes
app.use("/authenticate", require("./routers/userRouter"));
app.use("/jobs", require("./routers/jobRouter"));
app.use("/job-application", require("./routers/jobApplicationRouter"));
