import colors from 'colors'
import sequelize from './dbConfig'

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.'.green)
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:'.cyan, err)
  })
