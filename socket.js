require('dotenv').config({path: __dirname + '/.env'});
const ws = require('ws');
const PORT = process.env.WS_PORT || 5050;

const wss = new ws.WebSocketServer({port: PORT});

const connections = [];
const rooms = {};

wss.on('connection', function connection(wsc, req) {

    wsc.on('message', function message(data, isBinary) {

        const jsonMessage = JSON.parse(data);

        switch (jsonMessage.action) {
            case 'init':
                wsc.id = jsonMessage.id || null;
                wsc.roomId = jsonMessage.roomId || null;

                if (jsonMessage.id) {
                    connections[jsonMessage.id] = wsc;
                }

                const result = {
                    type: jsonMessage.action,
                    success: true,
                    id: wsc.id,
                    roomId: wsc.roomId
                }

                if (jsonMessage.roomId) {
                    if (!rooms[jsonMessage.roomId]) {
                        rooms[jsonMessage.roomId] = {
                            members: [jsonMessage.id],
                        }
                    } else {
                        if (rooms[jsonMessage.roomId].members.indexOf(jsonMessage.id) == -1) {
                            rooms[jsonMessage.roomId].members.push(jsonMessage.id);
                        }
                    }
                }

                wsc.send(JSON.stringify(result));
                break;
            case 'broadcastAll':
                wss.clients.forEach(function each(client) {
                    if (client.readyState === ws.WebSocket.OPEN) {
                        client.send(
                            JSON.stringify({
                                type: jsonMessage.action,
                                data: jsonMessage.data,
                                id: wsc.id,
                                roomId: null
                            })
                        );
                    }
                })
                break;
            case 'broadcastRoom':
                if (wsc.roomId && rooms[wsc.roomId]) {
                    let members = rooms[wsc.roomId].members || [];
                    members.forEach(member => {
                        if (connections[member] && connections[member].readyState && connections[member].readyState === ws.WebSocket.OPEN) {
                            connections[member].send(
                                JSON.stringify({
                                    type: jsonMessage.action,
                                    data: jsonMessage.data,
                                    id: wsc.id,
                                    roomId: wsc.roomId
                                })
                            );
                        }
                    });
                }
                break;
            case 'PING':
                setTimeout(function () {
                    wsc.send('PONG');
                }, 2000);
                break;
            default:
                break;
        }

        // wss.clients.forEach(function each(client) {
        //     if (client.readyState === ws.WebSocket.OPEN) {
        //         // client.send(data, { binary: isBinary });
        //
        //         try {
        //             const jsonMessage = JSON.parse(data);
        //             switch (jsonMessage.action) {
        //                 // case 'CHAT':
        //                 //     client.send(data + "");
        //                 //     break;
        //                 // case 'CART':
        //                 //     client.send(data + "");
        //                 //     break;
        //                 // case 'STORY.ADDED':
        //                 //     if (client !== wsc) {
        //                 //         client.send(data + "");
        //                 //     }
        //                 //     break;
        //                 // case 'STREAM.STARTED':
        //                 //     if (client !== wsc) {
        //                 //         client.send(data + "");
        //                 //     }
        //                 //     break;
        //                 // case 'STREAM.FINISHED':
        //                 //     if (client !== wsc) {
        //                 //         client.send(data + "");
        //                 //     }
        //                 //     break;
        //                 case 'PING':
        //                     setTimeout(function() {
        //                         client.send('PONG');
        //                     }, 2000);
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         } catch (error) {
        //         }
        //     }
        // });

    });


    wsc.on('close', function () {
        // setTimeout(function() {
        if (wsc.id) {
            if (wsc.roomId) {
                // callEventEmitter.emit('callEnded', wsc.roomId, wsc.id, true);
                // console.log("SOCKET DISCONNECTED. HANGUP", "ROOMID " + wsc.roomId, " TOKEN " + wsc.id);
            }
            if (connections.hasOwnProperty(wsc.id)) {
                //     console.log("deleting " + wsc.id)
                // delete connections[wsc.id];
                //   console.log(connections)
            }
        }
        // console.log('closed', wsc.id);
        // }, 10000)
    });
});

// function onConnect(wsClient) {
//     // wsClient.on('close', function() {
//     // });
//
//     wsClient.on('message', function(message) {
//         try {
//             const jsonMessage = JSON.parse(message);
//             switch (jsonMessage.action) {
//                 case 'CHAT':
//                     wsClient.send(message + "");
//                     break;
//                 case 'CART':
//                     wsClient.send(message + "");
//                     break;
//                 case 'PING':
//                     setTimeout(function() {
//                         wsClient.send('PONG');
//                     }, 2000);
//                     break;
//                 default:
//                     break;
//             }
//         } catch (error) {
//         }
//     });
// }
