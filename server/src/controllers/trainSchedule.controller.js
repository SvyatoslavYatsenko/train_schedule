import { TrainSchedules } from '../models/trainSchedule.model.js';
import { deleteSpasesInValues, handleObjectKeys } from '../services/schedule.service.js';
import { sequelize } from '../database.js';

export const createTrainSchedule = (req, res) => {
    const handledData = handleObjectKeys(deleteSpasesInValues((req.body)));

    sequelize.sync().then(() => { 
        TrainSchedules.create({
            number: handledData.number,
            route: handledData.route,
            periodicity: handledData.periodicity,
            station: handledData.station,
            arrival: handledData.arrival,
            departure: handledData.departure,
            terminal: handledData.terminal
        }).then(() => {
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
     
     }).catch((error) => {
        console.error('Unable to create record : ', error);
     });
     res.json()
}

export const updateTrainSchedule = (req, res) => {
    const handledData = handleObjectKeys(deleteSpasesInValues((req.body)));
    const test = {
        scheduleId: +req.params.id,
      }
    sequelize.sync().then(() => { 
        TrainSchedules.update({
            number: handledData.number,
            route: handledData.route,
            periodicity: handledData.periodicity,
            station: handledData.station,
            arrival: handledData.arrival,
            departure: handledData.departure,
            terminal: handledData.terminal
        },
        {
            where: {
                id: test.scheduleId,
              }
        }
        ).then(() => {
        }).catch((error) => {
            console.error('Failed to update a new record : ', error);
        });
     
     }).catch((error) => {
        console.error('Unable to update record : ', error);
     });
     res.json()
}


export const getTrainScheduleList = (req, res) => {
    sequelize.sync().then(() => {
        TrainSchedules.findAll().then(data => {
            res.send(data)
        }).catch((error) => {
            console.error('Get all data', error);
        });
    
    }).catch((error) => {
        console.error('Unable to get all data : ', error);
    });
}

export const deleteTrainSchedule = (req, res) => {
    const test = {
        scheduleId: +req.params.id,
      }
    
    sequelize.sync().then(() => {

    TrainSchedules.destroy({
        where: {
          id: test.scheduleId
        }
    }).then(() => {
        console.log("Successfully deleted record.")
    }).catch((error) => {
        console.error('Failed to delete record : ', error);
    });
  
  }).catch((error) => {
      console.error('Unable to create table : ', error);
  });
  res.json()
}
