class TicketControl {

    

    constructor( ) {

        this.ultimo = 0;
        this.fecha = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if( data.fecha === this.fecha ){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        }else{
            this.reiniciarConteo();
        }
    }

    siguienteTicket(){
 
        let { Ticket } = require('./ticket');

        this.ultimo += 1;

        let tiket = new Ticket(this.ultimo, null);

        this.tickets.push(tiket)

        this.guardarDatos(  );

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTiket() {

        return `Ticket ${this.ultimo}`;

    }

    atenderTicket(escritorio){

        let { Ticket } = require('./ticket');

        if(this.tickets.length===0){
            return 'No hay tickets para atender';
        }

        let takeTicket = this.tickets[0].numero;

        this.tickets.shift();

        let atender = new Ticket(takeTicket, escritorio);

        this.lastFour.unshift(atender);

        if(this.lastFour.length > 4){
            this.lastFour.splice(-1,1);
        }

        this.guardarDatos();

        return atender;

    }

    getUltimos4() {
        return this.lastFour;
    }

    reiniciarConteo(){

        this.tikets = [];
        this.lastFour = [];
        this.guardarDatos( );

    }

    guardarDatos(){

        const fs = require('fs');

        let jsonData = {
            ultimo: this.ultimo,
            fecha : this.fecha,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let stringJsonData =  JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', stringJsonData );

    }

}

module.exports = {
    TicketControl
}