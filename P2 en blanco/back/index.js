import express from "express";
import service from "./src/services/reparaciones.service.js";

import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

app.get("/reparaciones", async (req, res) => {
    try{
        const reparaciones = await service.getAll();
        res.json(reparaciones);
    }catch(e){
        console.log(e)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
   
})

app.get('/reparaciones', async (req, res) =>{
    const { dni } = req.query;

    if (!dni) {
        return res.status(400).json({ error: 'Se requiere un filtro de DNI' });
    }
    try {
        const reparaciones = await service.getReparacionPorDNI({
            where: {
                Dni: {
                    [Op.like]: `%${dni}%`
                }
            }
        });
        res.json(reparaciones);
    } catch(e){
        console.log('Error de tipo', e)
        res.status(404).send({mensaje: 'Ha ocurrido un error al filtrar las reparaciones.'})
    }
})

app.post('/reparaciones', async (req, res) => {
    try{
       const ordenId = await service.create(req.body)
    return res.json(ordenId);
    }catch(e){
        console.log(e)
        res.status(500).send({mensaje: 'Ha ocurrido un error interno.'})
    }
});

app.delete('/:id', async(req, res)=>{
    try {
        const id = req.params.id
        const d = await service.deleteReparacion(id)
        if(d !== null){
            res.json(d)
        }else{
            res.status(400).send({msg: 'ID del turno invalido'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).send({ msg: 'Error al eliminar la reparacion.' });

    }
})
app.put('/:id', async(req, res)=>{
    try {
        const id = req.params.id
        const data  = req.body
        const r = await service.updateReparacion(id, data)

        if(r !== null){
            res.json(r)
        }else{
            res.send({msg: 'El id y los datos no pueden ser nulos'}).status(400)
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).send({ msg: 'Error al actualizar la reparacion' });
        
    }
})

app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3001");
});
