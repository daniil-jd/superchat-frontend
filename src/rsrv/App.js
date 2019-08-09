// rccp

import React, {Component} from 'react';
import client from "./http/client";

class App extends Component {
    state = {
        ws: null,
        check: false
    };

    componentDidMount() {
        // const {ws} = this.state.ws;
        console.log('did mount');
        if (this.state.ws !== null && this.state.ws.readyState === WebSocket.OPEN) {
            console.log('already connect');
        } else {
            console.log('connecting');
            this.connect();
        }

    };

    onSend = (evt) => {
        evt.preventDefault();
        const textEl = document.querySelector('#text');
        const msg = textEl.value;
        textEl.value = '';

        if (this.state.ws === null) {
            this.connect();
        }
        const ws = this.state.ws;
        let room = 1;
        if (this.state.check === false) {
            room = 2;
        }
        console.log('room: ' + room + ' ' + this.state.check);

        if (ws !== null && ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify({
                    id: 0,
                    message: msg,
                    room: room
                }));
            } catch (e) {
                console.log('send error')
            }
        };
    };

    checkBoxChange = (evt) => {
        this.setState({check: evt.target.checked});
    };

    // JSX -> React.createElement({ ? : })
    // array.map(o => <div></div>)
    connect = async () => {
        console.log('in connect');
        try{
            const conn = await (new WebSocket('ws://localhost:8080/iwschat'));
            console.log('conn is success');

            const messagesEl = document.querySelector('#messages');
            conn.binaryType = 'blob'; // по умолчанию (в какой формат браузер будет конвертировать входящие бинарные данные)

            conn.addEventListener('open', () => {
                console.info('connected!');
            });

            conn.addEventListener('message', evt => {
                // console.log('data' + evt.data); // String, Blob, ArrayBuffer
                if (evt.data instanceof Blob) {
                    // значит текстовое сообщение
                    return;
                }
                const msg = JSON.parse(evt.data);
                // значит текстовое сообщение
                const roomState = msg.room === 1;
                console.log('room st: ' + roomState + ' check: ' + this.state.check);
                if (roomState === this.state.check) {
                    const messageEl = document.createElement('div');
                    messageEl.textContent = evt.data;
                    messagesEl.appendChild(messageEl);
                }

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
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div id="messages"></div>
                        <form id="bttn">
                            <input type="checkbox" name="option" value={this.state.check} onChange={(evt) => this.checkBoxChange(evt)}/>
                        </form>
                        <form id="input" onSubmit={(evt) => this.onSend(evt)}>
                            <input id="text" />
                                <button>
                                    Submit
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {};

export default App;
