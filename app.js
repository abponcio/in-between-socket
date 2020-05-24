const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});

Socketio.on("connection", socket => {
    
    socket.on('join', player => {

        player.current = true;
        player.id = socket.id;

        switch(player.position) {
            case 'left':
                player.name = 'player left';
                Socketio.emit('player', player);
                break;
            case 'right':
                player.name = 'player right';
                Socketio.emit("player", player);
                break;
            case 'top':
                player.name = 'player top';
                Socketio.emit("player", player);
                break;
            case 'bottom':
                player.name = 'player bottom';
                Socketio.emit("player", player);
                break;
        }
    });

    socket.on('update', payload => {

        Socketio.emit('updateGame', payload);
    });
});
