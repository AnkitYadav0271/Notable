//*Imports are here

import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import connectMongo from "./database/db.init.js";
import userRoute from "./routes/users.route.js";
import cors from 'cors';
//* imports ends here

const app = express();
//*use starts here
configDotenv();
//*ends starts here

//*_______________Middlewares starts here ________________//
app.use(express.json())
app.use(express.urlencoded());
app.use(cors({
  origin:`http://localhost:5173`,
  Credential:true
}))

//*_______________Middlewares starts here ________________//



const PORT = process.env.PORT || 6969;

app.get("/", (req, res) => {
  res.send("HEllo server");
});

//*---------------------------Routes Starts here -----------------------------//
app.use("/user", userRoute);

//*---------------------------Routes Ends here -----------------------------//

app.listen(PORT, () => {
  connectMongo();
  console.log("server is running at server 6969");
});
