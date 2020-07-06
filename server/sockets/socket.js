const { io } = require('../server');
const { TicketControl } = require('../class/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let sig = ticketControl.nextTicket();
        console.log(sig);
        callback(sig);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }
        let attendTicket = ticketControl.attendTicket(data.desk);
        callback(attendTicket);

        client.broadcast.emit('last4', { last4: ticketControl.getLast4() });

    });

});