const routes = require('express').Router();
routes.get('/reg', (req, res) => {
    res.send('ruta principal')
});

module.exports = routes;


const consulta = require('../config/conexionbd.js');

/*-------------------------------------------------------------------------------------RUTAS----------------------------------------------------------------*/

//rutas
routes.get('/paqueteria/rutas', (req, res) => {
    let sql = "SELECT * FROM rutas";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
})
//rutas completas
routes.get('/paqueteria/rutas_completas', (req, res) => {
    let sql = "select id_ruta, nombre_ruta, direccion, colonia.nombre_colonia Colonia, codigo_postal.codigo_postal CodigoPostal, municipio.nombre_municipio NombreMunicipio, estado.nombre_estado NombreEstado, pais.nombre_pais Pais from rutas inner join direccion on rutas.fk_direccion = direccion.id_direccion inner join colonia on direccion.id_colonia = colonia.id_colonia inner join codigo_postal on direccion.id_codigo_postal = codigo_postal.id_codigo_postal inner join municipio on direccion.id_municipio = municipio.id_municipio inner join estado on direccion.id_estado = estado.id_estado inner join pais on direccion.id_pais = pais.id_pais";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
})

//borrar ruta
routes.delete('/paqueteria/delete_ruta/:id', (req, res) => {
    const { id } = req.params;

    let sql = "DELETE FROM rutas where id_ruta=?";
    consulta.query(sql, [id], (err, rows) => {
        if (!err) res.json('ruta eliminada')
        else
            console.error(err)

    })
})


//insertar ruta
routes.post('/paqueteria/insert_ruta', (req, res) => {
    const { nombre_ruta, fk_direccion } = req.body;

    let sql = "INSERT INTO `paqueteria`.`rutas` (`nombre_ruta`, `fk_direccion`) VALUES ('" + nombre_ruta + "'," + fk_direccion + ")";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json('insertaste una nueva ruta')
        else
            console.error(err)

    })
})



//Actualizar datos rutas
routes.put('/paqueteria/put_ruta/:id_ruta', (req, res) => {
    const { nombre_ruta } = req.body;
    const { fk_direccion } = req.body;
    const { id_ruta } = req.params;

    let sql = "UPDATE `paqueteria`.`rutas` SET `nombre_ruta`='" + nombre_ruta + "',`fk_direccion` = " + fk_direccion + "  WHERE `id_ruta` = ?";

    consulta.query(sql, [id_ruta], (err, rows) => {
        if (!err)
            res.json('ruta actualizada');
        else
            console.error(err);
    })
})

/*---------------------------------------------------------PAQUETES--------------------------------------------------------------------------------*/
//Consultar DB
routes.get('/paqueteria/get', (req, res) => {
    //let sql = 'SELECT * FROM paquete';
    let sql = 'SELECT id_paquete, nombre_cliente, dir_envio, contenido, tp_pago FROM paquete INNER JOIN tipo_pago ON paquete.fk_pago = tipo_pago.id_pago INNER JOIN tipo_paquete ON paquete.fk_tp_paquete = tipo_paquete.id_tp_paquete INNER JOIN clientes ON paquete.fk_clientes = clientes.id_cliente INNER JOIN envios ON paquete.fk_envios = envios.id_envio ORDER BY id_paquete';

    consulta.query(sql, (err, rows) => {
        if (!err)
            res.json(rows);
        else
            console.error(err);
    })
})
//Consultar DBfk
routes.get('/paqueteria/getFK', (req, res) => {
    //let sql = 'SELECT * FROM paquete';
    let sql = 'select * from paquete;';

    consulta.query(sql, (err, rows) => {
        if (!err)
            res.json(rows);
        else
            console.error(err);
    })
})
//Consulta + Id
routes.get('/paqueteria/get/:id_paquete', (req, res) => {
    const { id_paquete } = req.params;
    let sql = 'SELECT id_paquete, nombre_cliente, dir_envio, contenido, tp_pago FROM paquete INNER JOIN tipo_pago ON paquete.fk_pago = tipo_pago.id_pago INNER JOIN tipo_paquete ON paquete.fk_tp_paquete = tipo_paquete.id_tp_paquete INNER JOIN clientes ON paquete.fk_clientes = clientes.id_cliente INNER JOIN envios ON paquete.fk_envios = envios.id_envio WHERE paquete.id_paquete = ?';

    consulta.query(sql, [id_paquete], (err, rows) => {
        if (!err)
            res.json(rows);
        else
            console.error(err);
    })
})

//Insertar datos DB
routes.post('/paqueteria/post', (req, res) => {
    const { fk_pago } = req.body;
    const { fk_tp_paquete } = req.body;
    const { fk_clientes } = req.body;
    const { fk_envios } = req.body;


    let sql = "INSERT INTO `paqueteria`.`paquete` (`fk_pago`, `fk_tp_paquete`, `fk_clientes`, `fk_envios`) VALUES ('" + fk_pago + "', '" + fk_tp_paquete + "', '" + fk_clientes + "', '" + fk_envios + "')";

    consulta.query(sql, (err, rows) => {
        if (!err)
            res.json('Dato insertado');
        else
            console.error(err);
    })
})

//Actualizar datos DB
routes.put('/paqueteria/put/:id_paquete', (req, res) => {
    const { id_paquete } = req.body;
    const { fk_pago } = req.body;
    const { fk_tp_paquete } = req.body;
    const { fk_clientes } = req.body;
    const { fk_envios } = req.body;
    let sql = "UPDATE `paqueteria`.`paquete` SET `fk_pago` = '" + fk_pago + "', `fk_tp_paquete` = '" + fk_tp_paquete + "', `fk_clientes` = '" + fk_clientes + "', `fk_envios` = '" + fk_envios + "' WHERE id_paquete = ?";

    consulta.query(sql, [id_paquete], (err, rows) => {
        if (!err)
            res.json('Dato actualizado');
        else
            console.error(err);
    })
})

//Eliminar datos DB
routes.delete('/paqueteria/delete/:id_paquete', (req, res) => {
    const { id_paquete } = req.params;
    let sql = 'DELETE FROM paqueteria.paquete WHERE paquete.id_paquete = ?';

    consulta.query(sql, [id_paquete], (err, rows) => {
        if (!err)
            res.json('Eliminado');
        else
            console.error(err);
    })
})

/*---------------------------------------------------------CLIENTES--------------------------------------------------------------------------------*/

//--------- Rutas -------------
//--------- Select * From clientes
routes.get('/paqueteria/clientes', (req, res) => {
    let sql = 'select * from clientes;';
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
})



//----------recuperar id
routes.get('/paqueteria/clientes/:id', (req, res) => {
    const { id } = req.params
    let sql = 'select * from clientes where id_cliente = ?'
    conecta.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows)
        }
    })
})

//---------- agregar 
routes.post('/paqueteria/clientes/nuevo', (req, res) => {
    const { nombre_cliente, correo, numero_cliente, contrasena, confirmar_contrasena } = req.body

    let sql = `insert into clientes(nombre_cliente, correo, numero_cliente, contrasena, confirmar_contrasena) values('${nombre_cliente}','${correo}','${numero_cliente}','${contrasena}','${confirmar_contrasena}')`
    consulta.query(sql, (err, rows) => {
        if (!err) res.json('insertaste un nuevo cliente')
        else
            console.error(err)

    })
})


//-----------eliminar
routes.delete('/paqueteria/clientes/eliminar/:id', (req, res) => {
    const { id } = req.params

    let sql = `delete from clientes where id_cliente = '${id}'`
    consulta.query(sql, [id], (err, rows) => {
        if (!err) res.json('cliente eliminado')
        else
            console.error(err)

    })
});




//Modificar
routes.put('/paqueteria/clientes/edit/:id_cliente', (req, res) => {
    const { id_cliente } = req.params
    const { nombre_cliente, correo, numero_cliente, contrasena, confirmar_contrasena } = req.body

    let sql = `update clientes set
                nombre_cliente = '${nombre_cliente}',
                correo = '${correo}',
                numero_cliente = '${numero_cliente}',
                contrasena = '${contrasena}',
                confirmar_contrasena = '${confirmar_contrasena}'
                where id_cliente = '${id_cliente}'`

    consulta.query(sql, [id_cliente], (err, rows) => {
        if (!err)
            res.json('cliente actualizado');
        else
            console.error(err);
    })
})

/*----------------------------------------------tipo_transporte----------------------------------------------*/


routes.get('/paqueteria/tipotransporte', (req, res) => {
    let sql = "select * from tipo_transporte;";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
})
//rutas completas
/* routes.get('/paqueteria/rutas_completas', (req, res) => {
    let sql = "select id_ruta, nombre_ruta, direccion, colonia.nombre_colonia Colonia, codigo_postal.codigo_postal CodigoPostal, municipio.nombre_municipio NombreMunicipio, estado.nombre_estado NombreEstado, pais.nombre_pais Pais from rutas inner join direccion on rutas.fk_direccion = direccion.id_direccion inner join colonia on direccion.id_colonia = colonia.id_colonia inner join codigo_postal on direccion.id_codigo_postal = codigo_postal.id_codigo_postal inner join municipio on direccion.id_municipio = municipio.id_municipio inner join estado on direccion.id_estado = estado.id_estado inner join pais on direccion.id_pais = pais.id_pais";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
}) */


routes.post('/paqueteria/inserttipotransporte', (req, res) => {
    const { tp_transporte, placas } = req.body;

    let sql = "INSERT INTO `paqueteria`.`tipo_transporte` (`tp_transporte`, `placas`) VALUES ('" + tp_transporte + "'," + placas + ")";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json('insertaste un nuevo transporte')
        else
            console.error(err)

    })
})



routes.put('/paqueteria/puttipotransporte/:id_tp_transporte', (req, res) => {
    const { tp_transporte } = req.body;
    const { placas } = req.body;
    const { id_tp_transporte } = req.params;

    let sql = "UPDATE `paqueteria`.`tipo_transporte` SET `tp_transporte`='" + tp_transporte + "',`placas` = " + placas + "  WHERE `id_tp_transporte` = ?";

    consulta.query(sql, [id_tp_transporte], (err, rows) => {
        if (!err)
            res.json('transporte actualizado');
        else
            console.error(err);
    })
})


routes.delete('/paqueteria/deletetipotransporte/:id_tp_transporte', (req, res) => {
    const { id_tp_transporte } = req.params;

    let sql = "DELETE FROM tipo_transporte where id_tp_transporte=?";
    consulta.query(sql, [id_tp_transporte], (err, rows) => {
        if (!err) res.json('ruta eliminada')
        else
            console.error(err)

    })
})


/*----------------------------------------------transportistas----------------------------------------------*/


routes.get('/paqueteria/transportista', (req, res) => {
    let sql = "select id_transportista, transportista.nombre, transportista.apellido_paterno, transportista.apellido_materno, telefono, tp_transporte, nombre_ruta, tipo_paquete.contenido from transportista inner join tipo_transporte on transportista.fk_tp_transportes = tipo_transporte.id_tp_transporte inner join rutas on transportista.fk_rutas  = rutas.id_ruta inner join paquete on transportista.fk_paquete = paquete.fk_tp_paquete inner join tipo_paquete on paquete.fk_tp_paquete = tipo_paquete.id_tp_paquete";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
})

 routes.get('/paqueteria/transportistafk', (req, res) => {
    let sql = "select * from transportista;";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json(rows)
        else
            console.error(err)

    })
}) 


routes.post('/paqueteria/posttransportista', (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, telefono, fk_tp_transportes, fk_rutas, fk_paquete} = req.body;

    let sql = "INSERT INTO `paqueteria`.`transportista` (`nombre`, `apellido_paterno`, `apellido_materno`, `telefono`, `fk_tp_transportes`, `fk_rutas`, `fk_paquete`) VALUES ('" + nombre + "','" + apellido_paterno + "','" + apellido_materno + "'," + telefono + "," + fk_tp_transportes + "," + fk_rutas + "," + fk_paquete + ")";
    consulta.query(sql, (err, rows) => {
        if (!err) res.json('insertaste un nuevo transportista')
        else
            console.error(err)

    })
})



routes.put('/paqueteria/puttransportista/:id_transportista', (req, res) => {
    const { nombre, apellido_paterno, apellido_materno, telefono, fk_tp_transportes, fk_rutas, fk_paquete } = req.body;
   /*  const { placas } = req.body; */
    const { id_transportista } = req.params;

    let sql = "UPDATE `paqueteria`.`transportista` SET `nombre`='" + nombre + "',`apellido_paterno`='" + apellido_paterno + "',`apellido_materno`='" + apellido_materno + "',`telefono` = " + telefono + ",`fk_tp_transportes` = " + fk_tp_transportes + ",`fk_rutas` = " + fk_rutas + ",`fk_paquete` = " + fk_paquete + "  WHERE `id_transportista` = ?";

    consulta.query(sql, [id_transportista], (err, rows) => {
        if (!err)
            res.json('transportista actualizado');
        else
            console.error(err);
    })
})


routes.delete('/paqueteria/deletetransportista/:id_transportista', (req, res) => {
    const { id_transportista } = req.params;

    let sql = "DELETE FROM transportista where id_transportista=?";
    consulta.query(sql, [id_transportista], (err, rows) => {
        if (!err) res.json('transportista eliminado')
        else
            console.error(err)

    })
})










