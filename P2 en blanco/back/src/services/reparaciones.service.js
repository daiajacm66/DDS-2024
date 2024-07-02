
import sequelize from "../models/database.js"

const getAll = async () => {
    const resultado = await sequelize.models.Reparaciones.findAll({
        order: [['Dni', 'ASC']]
    })
    return resultado.map(p => {
        return {
            Id: p.dataValues.Id,
            Dni: p.dataValues.Dni,
            FechaIngreso: p.dataValues.FechaIngreso,
            TipoElectrodomestico: p.dataValues.TipoElectrodomestico,
            Reparado: p.dataValues.Reparado,
            Diagnostico: p.dataValues.Diagnostico
        }
    })
}

const create = async (orden) => {

    console.log(orden)
    const resultado = await sequelize.models
    .Reparaciones.create({
        Dni: orden.Dni,
        FechaIngreso: orden.FechaIngreso,
        TipoElectrodomestico: orden.TipoElectrodomestico,
        Reparado: orden.Reparado, 
        Diagnostico: orden.Diagnostico
    })
    
    return {
        Id: resultado.dataValues.Id,
    };

}

async function getReparacionPorDNI(filter){
    try {
        const res = await sequelize.models.Reparaciones.findAll({
            where: {
                Dni: {
                    [Op.like]: `%${filter}%`
                }
            }
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteReparacion(id){
    try {
        if(id){
            const d = await sequelize.models.Reparaciones.destroy({
                where: { id }
            });
            return d
        }else{
            console.log('El id no puede ser null')
            return null
        }
        

    } catch (error) {
        console.log(error)
        throw error
    }
}

async function updateReparacion(id, data){
    try {
        if(id && data){
            const act = await sequelize.models.Reparaciones.update(data, {where: {id}})
            return act
        }
        return null

    } catch (error) {
        throw error        
    }
}

export default  {
    getAll,
    create,
    deleteReparacion,
    updateReparacion,
    getReparacionPorDNI
}