import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
    try {
        if(!err){
        connection.release();
        console.log('Conexión a BD Satisfactoria');}
        else{
            console.log('Conexión a BD con Problemas!!!')
        }
    } catch (err) {
        throw err;
    }
    
    
})

export default pool;