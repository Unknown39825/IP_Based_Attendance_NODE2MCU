require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// my routes
const studentRoutes = require("./routes/student");
const classRoutes = require("./routes/class");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

//My Routes
app.use("/student",studentRoutes);
app.use("/class",classRoutes)

app.use("/", (req, res) => {
  res.send("attendance marker");
});

const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
