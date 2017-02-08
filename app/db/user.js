import Sequelize from 'sequelize'
import sequelize from './dbConfig'
import {copyFile, genHash} from '../utils'



const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  image: Sequelize.STRING
})

export function showUsers() {
  const all = User.findAll()
  all.then( data => console.log(data.dataValues) )
  return all
}

export function findUserById(id) {
  return User.findOne({where: {id: id}})
}

export function createUser(username, birthday, files) {

  sequelize
    .sync()
    .then( () => {
      let image = ''
      files.forEach( file => {
        const imageName = `${genHash()}___${file.filename}`
        image = `/uploads/${imageName}`
        copyFile(file.path, imageName)
      } )
      return User.create({ username, birthday, image})
    })
    .then( (user) => {
      console.log(
        user.get({plain: true})
      )
    } )
}
