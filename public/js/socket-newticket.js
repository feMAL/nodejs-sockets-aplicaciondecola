
//Establecer comunicacion

var socket = io();

socket.on('connect', ()=> {

    console.log('connectado al servidor');

});

socket.on('disconnect', () => {
    
    console.log('desconnectado del servidor');

});

socket.on('estadoActual', (resp )=>{
    $('#lblNuevoTicket').html(resp.actual)
})

$('button').on('click', ()=>{

    socket.emit('crearTicket', function( resp ){
        $('#lblNuevoTicket').html(resp.nextTicket);
    });

});