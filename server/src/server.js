import express from "express";
import { getAllData, deleteData } from "./controllers/trainSchedule.controller.js";
import cors from 'cors'

const PORT = process.env.PORT || 3001;

const app = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

app.get("/schedule",  getAllData);

app.delete("/schedule/:id", deleteData);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/schedule`);
});
