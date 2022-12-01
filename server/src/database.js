import Sequelize from 'sequelize';
const sequelize = new Sequelize(
 'test',
 'svyatoslav',
 'manowars',
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
