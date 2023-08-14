const express= require('express')
const { Socket } = require('socket.io-client')
const app =express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)

})

app.use(express.static(__dirname + '/public'))
app.get('/', (req , res) =>{
    res.sendFile(__dirname + '/index.html')
})

// Socket

const io = require('socket.io')(http)
var users ={};


io.on('connection', socket=>{
    socket.on('connect' , welcome=>{
            users[socket.id] = UserName;
            socket.broadcast.emit('connect' , welcome )
    })
    socket.on('user-joined', UserName=>{
        // console.log("Connected");
        users[socket.id] = UserName;
        socket.broadcast.emit('user-joined', UserName)
    })

    socket.on('send', message=>{
        
        socket.broadcast.emit('receive', {message: message, UserName: users[socket.id]});
    
    });

    socket.on('disconnect',function message(){
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
})
