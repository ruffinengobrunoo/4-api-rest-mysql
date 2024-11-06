//modulos
const express = require('express');
const db = require('./db/conexion')
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
const app = express();
const port = 3000;


//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())

// //Función para leer los datos del archivo .json
// const leerDatos = () => {
//     try {   //intenta convertir cadena, si no funciona nos muestra por consol el error (catch)
//         const datos = fs.readFileSync('./public/data/datos.json')

//         return JSON.parse(datos); // Convierte una cadena JSON en un objeto JavaScript
//         // console.log(JSON.parse(datos)) probar si funciona y despues llamar funcion
//     } catch (error) {
//         console.log(error)
//     }
// }

// //leerDatos()
// const escribirDatos = (datos) => {
//     try {
//         fs.writeFileSync('./public/data/datos.json', JSON.stringify(datos)) //writeFile permite escribir datos || JSON.stringify convierte un objeto JS en JSON

//     } catch (error) {
//         console.log(error)

//     }
// }



app.get('/productos', (req, res) => {
   // res.send('Listado de productos')
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, result)=>{
        if(err){
            console.error('error de lectura')
            return;
        }
        console.log(result)
        res.json(result)
    })
})

app.get('/productos/:id', (req, res) => {

    //res.send('Buscar producto por ID')
    const datos = leerDatos();
    const prodEncontrado= datos.productos.find ((p) => p.id == req.params.id)
    if (!prodEncontrado) { // ! (no) o diferente
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})

app.post('/productos', (req, res) => {
    // console.log(req.body)
    // console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO productos (titulo, descripcion, precio) VALUES (?, ?, ?)";
    db.query (sql, values, (err, result) => {
        if(err){
            console.error('error de lectura')
            return;
        }
        console.log(result)
        res.json({mensaje: "nuevo producto agregado"})
   
    })
})

app.put('/productos/:id', (req, res) => {
    // res.send('Actualizar producto por id')
    const id= req.params.id;
    const nuevosDatos= req.body;
    const datos = leerDatos()
    const prodEncontrado=datos.productos.find((p)=>p.id ==req.params.id)
    console.log(prodEncontrado)
    if (!prodEncontrado) {
        return res.status(404).json({mensaje:"No se encontró el producto"})
    }
    datos.productos = datos.productos.map(p => p.id == req.params.id ? { ...p, ...nuevosDatos } : p)
    escribirDatos(datos)
    res.json({mensaje:"producto actualizado"})
})

app.delete('/productos/:id', (req, res) => {
    // res.send('Eliminando Producto')
    const id=req.params.id;

    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.error('error al borrar')
            return;
        }
        console.log(result)
        res.json({mensaje: "producto borrado"})
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});