const socket = io()

let submit = document.querySelector('send');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('recieve.mp3');
var sound = new Audio('send.mp3');
let UserName;


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
}
    else if(position=='right'){
    sound.play();
}
}
function scrollToBottom(){
    messageContainer.scrollTop = messageContainer.scrollHeight
}
const joining = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
}

do{
      UserName = prompt('Enter joining name');
}while(UserName==0)

socket.emit('user-joined',`${UserName}`);

socket.on('connect', welcome=>{
    alert(`Welcome - You joined with name ${UserName}`)
    joining(`You: ${UserName}` , 'right')
})
socket.on('user-joined', UserName=>{
    append(`${UserName} joined the chat`, 'left');
    scrollToBottom();
})

socket.on('receive',data=>{
    
    append(` ${data.UserName}: ${data.message} `, 'left');
    scrollToBottom();
})
socket.on('leave', name =>{
    append(` ${UserName} left the chat`, 'left');
})
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    
    socket.emit('send',message);
    
    messageInput.value='';
    scrollToBottom();
})

