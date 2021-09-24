let ws = null;
let Protocal = null;
let Host = null;
let Port = null;

function sendRegister() {
    ws.send('{"message": "register", "register":"non_ip_data"}');
}

function getConfig() {
    ws.send('{"message": "config_get"}');
}

function sendMsg() {
    if (document.getElementById('command').value == '')
        document.getElementById('receivedMsg').innerHTML = 'no command';
    else
        ws.send(document.getElementById('command').value);
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
        //console.log(receivedMsg.data);
        //console.log(receivedMsg.data);
        let receiveMsgObj = JSON.parse(receivedMsg.data);// string to object
        //console.log(receiveMsgObj.message);
        console.log(typeof (receiveMsgObj));
        document.getElementById('receivedMsg').innerHTML = JSON.stringify(receiveMsgObj);
    };

}