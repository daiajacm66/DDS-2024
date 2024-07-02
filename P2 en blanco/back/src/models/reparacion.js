import { DataTypes } from "sequelize";

const ReparacionAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El DNI del ingresante es necesario"
            }
        }
    },
    FechaIngreso: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "La hora de ingreso es necesaria"
            }
        }
    },
    TipoElectrodomestico: {
        type: DataTypes.STRING
    },

    Diagnostico: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Diagnóstico es necesario"
            }
        }
    },


    Reparado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "Reparado es necesario"
            }
        }
    }
}

const ReparacionOptions = {
    timestamps: false
}

export default {
    ReparacionAttributes,
    ReparacionOptions
}
