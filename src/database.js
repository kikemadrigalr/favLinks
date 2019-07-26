//archivo conexion a la base de datos
const mysql = require('mysql');
const { promisify } = require('util')

//requerimos los parametros de la base de datos definidos en un objeto
const { database } = require('./keys');

//conexion a bd
const pool = mysql.createPool(database);

//ejecutar la conexion
pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      //no se establecio la conexion
      console.error('La Conexion ha sido cerrada');
    }

    if (error.code === 'ER_CON_COUNT_ERROR') {
      //cuantas conexiones tiene la base de datos
      console.error('La base de datos tiene mas de una conexion')
    }

    if (error.code === 'ECONNREFUSED') {
      //la conexion ha sido rechazada
      console.error('La conexion a la base de datos fue rechazada')
    }
  }

  if(connection){
    connection.release();
    console.log('Se establecio la conexion a dblinks');
    return;
  }
});

//promisify pool query
//convierte callbacks en promesas para hacer consultas a la base de datos 
pool.query = promisify(pool.query)

module.exports = pool;