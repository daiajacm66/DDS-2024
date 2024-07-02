import Sequelize from "sequelize";
import ReparacionModel from "./reparacion.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './reparaciones.db'
})

sequelize.define(
    'Reparaciones',
    ReparacionModel.ReparacionAttributes,
    ReparacionModel.ReparacionOptions
)

try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
