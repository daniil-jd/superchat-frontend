import React, {Component} from 'react';
import webSocket from "../http/webSocket";

class WebSocketExecutor extends Component {
    connect = async () => {
        console.log('in connect');
        console.log(localStorage.getItem('token'));
        try{
            const connectionString = webSocket.baseURL + localStorage.getItem('token');
            const conn = await (new WebSocket(connectionString));

            const messagesEl = document.querySelector('#messages');
            conn.binaryType = 'blob'; // по умолчанию (в какой формат браузер будет конвертировать входящие бинарные данные)

            conn.addEventListener('open', () => {
                //get all messages message
                console.info('open, connected!');
            });

            conn.addEventListener('message', evt => {
                console.info('open, event mssg!');
                // console.log('data' + evt.data); // String, Blob, ArrayBuffer
                if (evt.data instanceof Blob) {
                    // значит текстовое сообщение
                    return;
                }
                const msg = JSON.parse(evt.data);
                // значит текстовое сообщение
                const messageEl = document.createElement('div');
                messageEl.textContent = evt.data;
                messagesEl.appendChild(messageEl);


            });
            conn.addEventListener('error', evt => {
                console.log(evt.code);
                console.log(evt.reason);
            });

            conn.addEventListener('close', evt => {
                console.log('closed!');
            });
            console.log(conn);
            this.setState({ws: conn});
            console.log(this.state.ws);
        } catch (e) {
            console.log('conn - bad');
            console.log(e.message);
        }

    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default WebSocketExecutor;