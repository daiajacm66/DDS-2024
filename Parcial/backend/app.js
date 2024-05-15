const express = require('express');
const { Sequelize, DataTypes, Op } = require('sequelize');
const cors = require('cors');

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Configura la conexión Sequelize (base de datos SQLite en memoria)
const sequelize = new Sequelize('sqlite::memory:');

// Define el modelo Paquete
const Tramite = sequelize.define('Tramite', {
    titular: DataTypes.STRING,
    dni: DataTypes.STRING,
    tipo: DataTypes.STRING,
    fechaInicio: DataTypes.TEXT,
    fechaCierre: DataTypes.TEXT,
    prioritario: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    }, 
{ timestamps: false });


// Inicializa la base de datos e inserta datos de muestra
async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Tramite.bulkCreate([
        { titular: 'Titular Test01', dni: 25639888, tipo: 'Exp01', fechaInicio: '01/03/2024', fechaCierre:'13/05/2024', prioritario: 'S', observaciones: 'Usa audífono' },
        { titular: 'Titular Test11', dni: 25639889, tipo: 'Exp010', fechaInicio: '01/03/2024', fechaCierre:'12/05/2024', prioritario: 'S', observaciones: 'Usa audífono' },
        { titular: 'Titular Test12', dni: 25639860, tipo: 'Exp010', fechaInicio: '11/04/2024', fechaCierre:'01/05/2024', prioritario: 'N', observaciones: 'Usa audífono' },
        { titular: 'Titular Test21', dni: 25639861, tipo: 'Exp010', fechaInicio: '01/03/2024', fechaCierre:'15/05/2024', prioritario: 'S', observaciones: 'Usa audífono' },
        { titular: 'Titular Test33', dni: 25639836, tipo: 'Exp01', fechaInicio: '01/04/2024', fechaCierre:'3/05/2024', prioritario: 'S', observaciones: 'Usa audífono' },
        { titular: 'Titular Test55', dni: 25639887, tipo: 'Exp01', fechaInicio: '01/05/2024', fechaCierre:'5/05/2024', prioritario: 'N', observaciones: 'Usa audífono' },
        { titular: 'Titular Test18', dni: 25639877, tipo: 'Exp09', fechaInicio: '10/03/2024', fechaCierre:'9/05/2024', prioritario: 'N', observaciones: 'Usa audífono' },
        { titular: 'Titular Test06', dni: 25639833, tipo: 'Exp09', fechaInicio: '11/03/2024', fechaCierre:'18/05/2024', prioritario: 'N', observaciones: 'Usa audífono' },
        { titular: 'Titular Test04', dni: 25639811, tipo: 'Exp01 X', fechaInicio: '12/03/2024', fechaCierre:'13/05/2024', prioritario: 'S', observaciones: 'Usa audífono' },
       
    ]);
}

// Endpoint para buscar según el criterio indicado por enunciado.
app.get('/tramites/:criterio', async (req, res) => {
    const tipoBuscado = req.params.tipo;
    try{
        const tiposEncontrados = await Tramite.findAll({
            where: {
                titular: {
                    [Op.like]: "%"+tipoBuscado+"%"
                }
            }
        });
        res.json(tiposEncontrados);
    } catch (err) {
        res.status(500).send('Error al filtrar tramites.')
    }   
});


// Endpoint para obtener todos los paquetes
app.get('/tramites', async (_, res) => {
    try{
        const tramites = await Tramite.findAll();
        res.json(tramites);
    } catch (err){
        res.status(400).send({message: 'Trámites no encontrados'})
    }
});

//Endpoint para crear un nuevo Trámite
app.post('/tramites', async (req, res) =>{
    const nuevoTramite = req.body;
    try{
        const tramiteCreado = await Tramite.create(nuevoTramite);
        res.status(201).json(tramiteCreado);
    } catch(err) {
        res.status(400).json({err: 'Error al crear un trámite.'});
    }
});

//Endpoint para eliminar un tramite por titular
app.delete('/tramites/:titular', async (req, res) => {
    const tram = await Tramite.findOne({
        where: {
            titular: req.params.titular
        }
    })
    if(tram){
        await tram.destroy()
        res.json(tram)
    } else { res.status(404).send({message: 'Tramite eliminado'})}
});

// Inicia el servidor
inicializarBaseDeDatos().then(() => {
    app.listen(4001, () => console.log('Servidor corriendo en http://localhost:4001'));
});