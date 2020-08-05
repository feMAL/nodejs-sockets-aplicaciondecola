const { io } = require('../server');
const utils = require('util');
const { TicketControl } = require('../classes/tiket-control');

const ticketControl = new TicketControl()

io.on('connection', (client) => {

    utils.log('# <--- Usuario conectado');

    client.on('disconnect', () => {
        utils.log('# ---> Usuario desconectado');
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTiket(),
        ultimos4: ticketControl.getUltimos4()
    });

    

    client.on('atenderTicket', (data, callback)=>{
        if(!data.escritorio){
            return callback({
                status:'fail',
                message: 'No ha enviado los datos requeridos'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);


        callback(atenderTicket);

        client.broadcast.emit('nuevoTicket', { ultimos4: ticketControl.getUltimos4() } );
    })

    // Escuchar el cliente
    client.on('crearTicket', (callback) => {

        utils.log('# <--- Usuario  envió un evento');

        let siguiente = ticketControl.siguienteTicket();

        callback({
            status: 'ok',
            nextTicket: siguiente
        });

    });


});