let ws = null;
let Protocal = null;
let Host = null;
let Port = null;

function sendMsg() {
    //let sendCommand = document.getElementById('command').value;
    if (document.getElementById('command').value == '')
        ws.send('{"message": "non_ip_data"}');
    else
        ws.send(document.getElementById('command').value);

    // {"message": "non_ip_data"}
}

function disconnectSocket() {
    ws.close();// close websocket
    document.getElementById('connectStatus').innerHTML = 'Disconnect';
    document.getElementById('receivedMsg').innerHTML = '';
}

function connectSocket() {
    ws = new WebSocket(document.getElementById('address').value);// create websocket
    ws.onopen = () => {
        console.log('WebSocket OPEN');// when connect
        document.getElementById('connectStatus').innerHTML = 'Connect';
    };
    ws.onclose = () => {// when disconnect
        console.log('WebSocket CLOSE');
    };
    ws.onerror = err => {// when error
        console.log('WebSocket ERROR');
        console.log(err);
    };
    ws.onmessage = receivedMsg => {// when receive massage
        console.log(receivedMsg.data);
        document.getElementById('receivedMsg').innerHTML = receivedMsg.data;
    };

}