let ws = null;
let Protocal = null;
let Host = null;
let Port = null;
let timestampBool = false;

function clean() {
    document.getElementById('recvLog').innerHTML = '';
}

function timestamp() {
    timestampBool = !timestampBool;
    document.getElementById('time').innerHTML = 'timestamp: ' + timestampBool;
}

function download() {// download log
    let logContent = document.getElementById('recvLog').textContent;
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(logContent));
    element.setAttribute('download', time() + " JSON LOG.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function time() {// current time
    let date = new Date();
    let timestamp = date.getFullYear() + '-' + date.getMonth() + '-' + (1 + date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return timestamp;
}

function hex_to_ascii(str1) {// convert hex data
    let hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    console.log(str);
    //document.getElementById('jsonData').innerHTML = str;
    const JSONlog = document.createElement('p');
    if (timestampBool)
        JSONlog.innerHTML = 'Timestamp:' + time() + '     ' + str + '\n';
    else
        JSONlog.innerHTML = str + '\n';
    document.getElementById('recvLog').appendChild(JSONlog);
    //return str;
}

function sendRegister() {// base station regist non ip
    ws.send('{"message": "register", "register":"non_ip_data"}');
}

function getConfig() {// get base station current setting
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
    //document.getElementById('jsonData').innerHTML = '';
    document.getElementById('time').innerHTML = '';
    document.getElementById('recvLog').innerHTML = '';
    /*restrict btn*/
    document.getElementById('disconnectSocket').disabled = true;
    document.getElementById('connectSocket').disabled = false;
    document.getElementById('sendMsg').disabled = true;
    document.getElementById('getConfig').disabled = true;
    document.getElementById('sendRegister').disabled = true;
    document.getElementById('timestamp').disabled = true;
    document.getElementById('download').disabled = true;
    document.getElementById('clearLog').disabled = true;
}

function connectSocket() {
    ws = new WebSocket(document.getElementById('address').value);// create websocket
    ws.onopen = () => {
        console.log('WebSocket OPEN');
        document.getElementById('connectStatus').innerHTML = 'Connect';
        document.getElementById('time').innerHTML = 'timestamp: ' + timestampBool;
        /*restrict btn*/
        document.getElementById('disconnectSocket').disabled = false;
        document.getElementById('connectSocket').disabled = true;
        document.getElementById('sendMsg').disabled = false;
        document.getElementById('getConfig').disabled = false;
        document.getElementById('sendRegister').disabled = false;
        document.getElementById('timestamp').disabled = false;
        document.getElementById('download').disabled = false;
        document.getElementById('clearLog').disabled = false;
    };

    ws.onclose = () => {
        console.log('WebSocket CLOSE');
    };
    ws.onerror = err => {
        console.log('WebSocket ERROR');
        console.log(err);
    };
    /*receive massage*/
    ws.onmessage = receivedMsg => {
        //console.log(receivedMsg.data);
        let receiveMsgObj = JSON.parse(receivedMsg.data);// string to object
        //console.log(receiveMsgObj.message);
        //console.log(typeof (receiveMsgObj));
        document.getElementById('receivedMsg').innerHTML = JSON.stringify(receiveMsgObj);
        if (receiveMsgObj.data)
            hex_to_ascii(receiveMsgObj.data);
    };
}