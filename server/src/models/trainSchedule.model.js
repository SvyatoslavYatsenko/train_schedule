import {Sequelize, DataTypes} from 'sequelize';

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

export const TrainSchedules = sequelize.define('trainSchedules', {
	number: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	route: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	periodicity: {
		type: DataTypes.STRING,
		allowNull: false
	},
	station: {
		type: DataTypes.STRING,
		allowNull: false
	},
	arrival: {
		type: DataTypes.TIME,
		allowNull: false
	},
	departure: {
		type: DataTypes.TIME,
		allowNull: false
	},
	terminal: {
		type: DataTypes.TIME,
		allowNull: false
	},
});

sequelize.sync().then(() => {
	console.log('Train schedule table created successfully!');
 }).catch((error) => {
	console.error('Unable to create table : ', error);
 });
