const setupDatabase = require('./lib/db')
const setupEntrepreneurModel = require('./model/entrepreneur')
const setupEntrepreneur = require('./lib/entrepreneur')

module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const EntrepreneurModel = setupEntrepreneurModel(config)
  


  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Entrepreneur = setupEntrepreneur(EntrepreneurModel)

  return {
    Entrepreneur
  }
}

