let ws = null;
let Protocal = null;
let Host = null;
let Port = null;

function download(filename, text) {// create .txt log
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function logDownload() {// require log on the brower
    //console.log(document.getElementById('recvLog').textContent);
    download(timeStamp() + " JSON LOG.txt", document.getElementById('recvLog').textContent);
}

function timeStamp() {
    let date = new Date();
    let timestamp = date.getFullYear() + '-' + date.getMonth() + '-' + (1 + date.getDate()) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return timestamp;
}

function hex_to_ascii(str1) {// analyze hex data
    let hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    console.log(str);
    document.getElementById('jsonData').innerHTML = str;
    let time = timeStamp();
    const JSONlog = document.createElement('p');
    JSONlog.innerHTML = 'Timestamp:' + time + '     ' + str + '\n';
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
    document.getElementById('jsonData').innerHTML = '';
    document.getElementById('recvLog').innerHTML = '';
    /*restrict btn*/
    const disconnectBtn = document.getElementById('disconnectSocket');
    disconnectBtn.disabled = true;
    const connectBtn = document.getElementById('connectSocket');
    connectBtn.disabled = false;
    const sendMsgBtn = document.getElementById('sendMsg');
    sendMsgBtn.disabled = true;
    const getConfigBtn = document.getElementById('getConfig');
    getConfigBtn.disabled = true;
    const sendRegisterBtn = document.getElementById('sendRegister');
    sendRegisterBtn.disabled = true;
    const logDownloadBtn = document.getElementById('logDownload');
    logDownloadBtn.disabled = true;
}

function connectSocket() {

    ws = new WebSocket(document.getElementById('address').value);// create websocket
    ws.onopen = () => {
        console.log('WebSocket OPEN');// when connect
        document.getElementById('connectStatus').innerHTML = 'Connect';
        /*restrict btn*/
        const disconnectBtn = document.getElementById('disconnectSocket');
        disconnectBtn.disabled = false;
        const connectBtn = document.getElementById('connectSocket');
        connectBtn.disabled = true;
        const sendMsgBtn = document.getElementById('sendMsg');
        sendMsgBtn.disabled = false;
        const getConfigBtn = document.getElementById('getConfig');
        getConfigBtn.disabled = false;
        const sendRegisterBtn = document.getElementById('sendRegister');
        sendRegisterBtn.disabled = false;
        const logDownloadBtn = document.getElementById('logDownload');
        logDownloadBtn.disabled = false;
    };

    ws.onclose = () => {
        console.log('WebSocket CLOSE');
    };
    ws.onerror = err => {
        console.log('WebSocket ERROR');
        console.log(err);
    };
    ws.onmessage = receivedMsg => {// receive massage
        //console.log(receivedMsg.data);
        let receiveMsgObj = JSON.parse(receivedMsg.data);// string to object
        //console.log(receiveMsgObj.message);
        //console.log(typeof (receiveMsgObj));
        document.getElementById('receivedMsg').innerHTML = JSON.stringify(receiveMsgObj);
        if (receiveMsgObj.data)
            hex_to_ascii(receiveMsgObj.data);
    };

}