import {Sequelize} from 'sequelize';
import { TrainSchedules } from '../models/trainSchedule.model.js';

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

sequelize.sync().then(() => { 
    TrainSchedules.create({
        number: 222,
        route: "Козяти-Бердичів",
        periodicity: "з 5/12/2022 щоденно",
        station: "Бердичів",
        arrival: "12:18",
        departure: "12:20",
        terminal: "13:40"
    }).then(res => {
        console.log(res)
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);
    });
 
 }).catch((error) => {
    console.error('Unable to create record : ', error);
 });

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


  
 
