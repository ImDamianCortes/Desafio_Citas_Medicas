//Configurando el pueto

const port = 3000

//Importando los paquetes
const http = require('http')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

let listUser = []

http
    .createServer((req, res) => {

        // ruta consulta
        if (req.url == '/') {
            axios
                .get('https://randomuser.me/api/')
                .then((data) => {
                    //data userApi
                    const name = data.data.results[0].name.first;
                    const lastName = data.data.results[0].name.last;
                    //data identificador unico y fecha
                    const id = uuidv4().slice(0, 6);
                    const date = moment().format('MMM Do YYYY, h:mm:ss a');

                    let index = 1
                    
                    listUser.push(
                        {
                            id: id,
                            nombre: name,
                            apellido: lastName,
                            timestamp: date
                        });

                    // Usurio registrado
                    console.log(chalk.blue.bold(`\n\nUsuario registrado exitosamente.\nNombre: ${name} - Apellido: ${lastName} - Id: ${id} - Timestamp: ${date}\n`))
                    
                    console.log(chalk.blue.bgYellow('Lista de usuarios.\n'))

                    _.forEach(listUser, (e) => {
                        //console.log(e)
                        res.write(`${index}.Nombre: ${e.nombre} - Apellido: ${e.apellido} - Id: ${e.id} - Timestamp: ${e.timestamp}\n`)
                        console.log(chalk.blue.bgWhite(`${index}.Nombre: ${e.nombre} - Apellido: ${e.apellido} - Id: ${e.id} - Timestamp: ${e.timestamp}`))
                        index++
                    })
                    res.end()
                    //console.log(listUser)
                })
                .catch((e) => {
                    console.log(e)
                })
        }

    })
    .listen(`${port}`, () => console.log(`Servidor encendido. http://localhost:${port}`))