import {Sequelize} from 'sequelize';
import { TrainSchedules } from '../models/trainSchedule.model.js';
import { deleteSpasesInValues, handleObjectKeys } from '../services/schedule.service.js';


const sequelize = new Sequelize(
	'test',
	'svyatoslav',
	'manowars',
	{
		host: '127.0.0.1',
		dialect: 'mysql',
	},
);

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch(error => {
	console.error('Unable to connect to the database: ', error);
});

export const sendData = (req, res) => {
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
        }).then(res => {
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
     
     }).catch((error) => {
        console.error('Unable to create record : ', error);
     });
}


export const getAllData = (req, res) => {
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

export const  deleteData = (req, res) => {
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
}

// sequelize.sync().then(() => {

//     TrainSchedules.findOne({
//         where: {
//             station : "Бердичів"
//         }
//     }).then(res => {
//         console.log(res)
//     }).catch((error) => {
//         console.error('Failed to retrieve data : ', error);
//     });

// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });


  
 
