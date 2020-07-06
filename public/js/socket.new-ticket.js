var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', () => {
    console.log('conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('desconectado del servidor');
});

socket.on('actualState', (data) => {
    label.text(data.actual);
});

$('button').on('click', () => {
    socket.emit('nextTicket', null, function(sigTicket) {
        label.text(sigTicket);
    })
});