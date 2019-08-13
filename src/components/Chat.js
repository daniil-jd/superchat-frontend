import React, {Component} from 'react';
import client from '../http/client';
import { extractError } from "../utils/utils.js";
import Loader from "./Loader.js";
import ChatDetails from "./ChatCard";
import AuthenticationContext from "../context/AuthenticationContext";

class Chat extends Component {
    state = {
        loading: false,
        items: [],
        error: null,
        ws: null,
    };

    onSend = (evt, o) => {
        evt.preventDefault();
        const textEl = document.querySelector('#text');
        const msg = textEl.value;
        textEl.value = '';

        // console.log(this.state.ws);
        if (this.state.ws === null || this.state.ws.readyState !== WebSocket.OPEN) {
            this.connect();
        }
        const ws = this.state.ws;
        console.log('room 0 : ' + o);
        console.log('room: ' + o.name);
        console.log(ws);

        if (ws !== null && ws.readyState === WebSocket.OPEN) {
            console.log('open, on send');
            try {
                ws.send(JSON.stringify({
                    id: 0,
                    authorName: localStorage.getItem('username'),
                    roomName: o.name,
                    message: msg,
                    created: '2019-08-09T00:30:45.511846700',
                    status: 'MESSAGE'
                }));
            } catch (e) {
                console.log('send error')
            }
        };
    };

    connect = async () => {
        console.log('in connect');
        console.log(localStorage.getItem('token'));
        try{
            const connectionString = 'ws://localhost:8080/api/iwschat?token=' + localStorage.getItem('token');
            const conn = await (new WebSocket(connectionString));
            console.log('conn is success');

            const messagesEl = document.querySelector('#messages');
            conn.binaryType = 'blob'; // по умолчанию (в какой формат браузер будет конвертировать входящие бинарные данные)

            conn.addEventListener('open', () => {
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

    async componentDidMount() {
        console.log('Chat mount');
        console.log(localStorage.getItem('token'));
        try {
            this.setState({loading: true, error: null});
            const response = await client.get('/rooms');
            const items = response.data;

            this.setState({items, loading: false});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
        this.connect();
    }

    onChat = item => {
        console.log("click-clack! ", item )
    };

    render() {
        console.log('Chat render mount');
        console.log(this.state.items);
        if (this.state.loading) {
            return (<Loader />);
        }

        const {items} = this.state;
        return (
            <div className="container">
                <div className="row">
                    {
                        items.map(o =>
                            <div className="col-6 mb-3" key={o.name} onClick={this.onChat(o)}>
                                <ChatDetails item={o} />

                                <div id="messages"/>
                                <form id="input" onSubmit={(evt, chat) => this.onSend(evt, o)}>
                                    <input id="text" />
                                    <button>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

Chat.propTypes = {};
Chat.contextType = AuthenticationContext;

export default Chat;
