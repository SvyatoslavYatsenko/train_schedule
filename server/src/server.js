import express from "express";
import { getTrainScheduleList, deleteTrainSchedule, createTrainSchedule, updateTrainSchedule } from "./controllers/trainSchedule.controller.js";
import cors from 'cors'
import pkg from 'body-parser';

const bodyParser = pkg;

const jsonParser = bodyParser.json()

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

// app.use(postTrimmer);

// function postTrimmer(req, res, next) {
//     if (req.method === 'POST') {
//         for (const [key, value] of Object.entries(req.body)) {
//             if (typeof(value) === 'string')
//                 req.body[key] = value.trim();
//         }
//     }
//     next();
// }

app.get("/schedule",  getTrainScheduleList);

app.delete("/schedule/:id", deleteTrainSchedule);

app.post("/schedule/add", jsonParser, createTrainSchedule);

app.patch("/schedule/edit/:id", jsonParser, updateTrainSchedule);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/schedule`);
});
