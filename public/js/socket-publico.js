
//Establecer comunicacion

var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var arrayTickets     = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4 ];
var arrayEscritorios = [ lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', (resp)=>{

    cargarEstados(resp.ultimos4);
    
});

socket.on('nuevoTicket', (res)=>{
   
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play()
    cargarEstados(res.ultimos4);

});

function cargarEstados(ultimos4){

    ultimos4.forEach((element,index) => {

        arrayEscritorios[index].html('Escritorio ' + element.escritorio);
        arrayTickets[index].html('Ticket ' + element.numero);

    });


}