let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./App/Routes/Web/enquiryRoutes");
require("dotenv").config();
let app = express();
app.use(cors());
app.use(express.json());
app.use("/api/website/enquiry", enquiryRouter);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is Runnning");
    });
  })
  .catch((err) => {
    console.log(err);
  });
