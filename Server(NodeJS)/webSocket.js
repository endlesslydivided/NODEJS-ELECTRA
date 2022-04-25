const ws = require('ws');
const {ChatRoom} = require('./models/models');

const wss = new ws.Server(
    {
        port: 5001
    },
    () => 
    {
        console.log('WS-server started on 5001')
    }
)

wss.on('connection', function connection(ws)
{

    ws.on('message',async function receiveMessage(message)
    {
        messageIn = JSON.parse(message);
        let chatRoom = {};
        let messageOut = {};
        switch (messageIn.event)
        {
            case 'message':
                {
                    const userId = messageIn.userId ? messageIn.userId : null;
                    const userName = messageIn.userName;

                    messageOut = 
                    {
                        id: chatRoom.id,
                        userId: userId,
                        userName: userName,
                        message: messageIn.message,
                        adminId: null,
                        adminName: null,
                        event: "message",
                        state: "wait",
                        from: messageIn.from,
                        to: messageIn.to
                    }
                    ws.send(JSON.stringify(messageOut));
                    break;
                }
            case 'connection':
                {
                    const userId = messageIn.userId ? messageIn.userId : null;
                    const userName = messageIn.userName;

                    chatRoom = await ChatRoom.create({userId});
                    messageOut = 
                        {
                            id: chatRoom.id,
                            userId: userId,
                            userName: userName,
                            message: messageIn.message,
                            adminId: null,
                            adminName: null,
                            event: "connection",
                            state: "wait",
                            from: messageIn.from,
                            to: messageIn.to
                        }
                    ws.send(JSON.stringify(messageOut));
                    break;
                }
            case 'adminEnter':
                {

                    const adminId = messageIn.adminId;
                    const adminName = messageIn.adminName;

                    chatRoom = ChatRoom.update({where: messageIn.id}, {adminId})
                    messageOut = 
                        {
                            id: chatRoom.id,
                            userId: messageIn.userId,
                            userName: userName,
                            message: messageIn.message,
                            adminId: adminId,
                            adminName: adminName,
                            event: "adminEnter",
                            state: "answering",
                            from: messageIn.from,
                            to: messageIn.to  
                        }
                  
                    ws.send(JSON.stringify(message));
                    break;
                }
            case 'close':
                {
                    const closedAt = Date.now();
                    chatRoom = ChatRoom.update({where: messageIn.id}, {closedAt})
                    messageOut = 
                        {
                            id: chatRoom.id,
                            userId: messageIn.userId,
                            userName: userName,
                            message: messageIn.message,
                            adminId: adminId,
                            adminName: adminName,
                            event: "close",
                            state: "closed",
                            from: messageIn.from,
                            to: messageIn.to  
                        }
                    break;
                }
        }
    }
    )
})

module.exports = wss;

/* message =
{
    id: 0,
    userId: 1,
    userName: "Александр",
    adminId: 1,
    adminName: "Ольга"
    event: "message",
    state: "answering",
    from: "client",
    to: "server"
} */