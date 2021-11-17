const express = require ('express')
const connectDB = require ('./config/db')

//crear el servidor
const app = express()

//Conectar a la BD
connectDB();

app.use(express.json({extended: true}));

//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;

app.use('/api/usuarios', require ('./routes/usuarios'));
app.use('/api/auth', require ('./routes/auth'));
app.use('/api/projects', require ('./routes/projects'));

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})