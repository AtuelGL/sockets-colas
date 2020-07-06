var socket = io();

var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('desk')) {
    window.location = 'index.html'
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('desk');
$('h1').text('Escritorio ' + desk);

$('button').on('click', function() {
    socket.emit('attendTicket', { desk }, function(resp) {
        if (resp === 'Sin tickets por atender') {
            label.text(resp);
            alert(resp);
            return
        }
        label.text('Ticket ' + resp.num);
    });
});