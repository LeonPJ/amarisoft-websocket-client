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
    ws.close();
    document.getElementById('connectStatus').innerHTML = 'Disconnect';
    document.getElementById('receivedMsg').innerHTML = '';
}

function connectSocket() {
    ws = new WebSocket(document.getElementById('address').value);
    ws.onopen = () => {
        console.log('WebSocket OPEN');
        document.getElementById('connectStatus').innerHTML = 'Connect';
    };
    ws.onclose = () => {
        console.log('WebSocket CLOSE');
    };
    ws.onerror = err => {
        console.log('WebSocket ERROR');
        console.log(err);
    };
    ws.onmessage = receivedMsg => {
        console.log(receivedMsg.data);
        document.getElementById('receivedMsg').innerHTML = receivedMsg.data;
    };

}