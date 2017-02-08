import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  'photosapi',
  'andrey',
  'qweQWE123',
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: { max: 5, min: 0, idle: 10000 }
  }
)

export default sequelize
