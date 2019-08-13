import React, {Component} from 'react';
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import TypingIndicator from './TypingIndicator'
import WhosOnlineList from './WhosOnlineList'
import client from "../http/client";
import {extractError} from "../utils/utils";
import Loader from "./Loader";

class SlackCloneChatScreen extends Component {
    state = {
        currentUser: localStorage.getItem('username'),
        currentRoom: null,
        rooms: [],
        messages: [],
        usersWhoAreTyping: [],
        loading: false,
        error: null,
        ws: null,
    };

    connect = async () => {
        try{
            const connectionString = 'ws://localhost:8080/api/iwschat?token=' + localStorage.getItem('token');
            const conn = await (new WebSocket(connectionString));
            console.log('conn is success');
            conn.binaryType = 'blob'; // по умолчанию (в какой формат браузер будет конвертировать входящие бинарные данные)
            conn.addEventListener('open', () => {
                console.info('open, connected!');
            });

            conn.addEventListener('message', evt => {
                // console.log('data' + evt.data); // String, Blob, ArrayBuffer
                if (evt.data instanceof Blob) {
                    // значит текстовое сообщение
                    return;
                }
                const messages = JSON.parse(evt.data);
                const roomName = messages[0].roomName;
                this.setState(
                    {
                        messages: messages,
                        currentRoom: roomName
                    });

            });
            conn.addEventListener('error', evt => {
                console.log(evt.code);
                console.log(evt.reason);
            });

            conn.addEventListener('close', evt => {
                console.log('closed!');
            });
            this.setState({ws: conn});
            console.log(this.state.ws);
        } catch (e) {
            console.log(e.message);
        }

    };

    onSend = (evt, msg) => {
        console.log('in onSend');
        if (this.state.ws === null || this.state.ws.readyState !== WebSocket.OPEN) {
            this.connect();
        }
        const {ws} = this.state;
        if (ws !== null && ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify({
                    id: 0,
                    authorName: this.state.currentUser,
                    roomName: this.state.currentRoom,
                    message: msg,
                    created: Math.floor(new Date().getTime()/ 1000),
                    status: 'MESSAGE'
                }));
                console.log('send!')
            } catch (e) {
                console.log('send error')
            }
        };

        console.log('end on send');
    };

    async componentDidMount() {
        console.log('SlackCloneChatScreen mount');
        console.log(localStorage.getItem('token'));
        try {
            this.setState({loading: true, error: null});
            const response = await client.get('/rooms');
            const rooms = response.data;
            var currentRoom = null;
            if (rooms.size > 0) {
                currentRoom = rooms[0];
            }
            this.connect();
            this.setState({currentRoom, rooms, loading: false});
        } catch (e) {
            this.setState({error : extractError(e), loading: false});
        }
        console.log('SlackCloneChatScreen mount end');
    }

    render() {
        if (this.state.loading) {
            return (<Loader />);
        }

        const styles = {
            container: {
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosOnlineListContainer: {
                width: '15%',
                padding: 2,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
            },
        }

        return (
            <div style={styles.container}>
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <WhosOnlineList
                            rooms={this.state.rooms}
                            ws = {this.state.ws}
                        />
                    </aside>
                    <section style={styles.chatListContainer}>
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList}
                        />
                        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                        <SendMessageForm
                            onSubmit={this.onSend}
                            onChange={this.sendTypingEvent}
                        />
                    </section>
                </div>
            </div>
        );
    }
}

SlackCloneChatScreen.propTypes = {};

export default SlackCloneChatScreen;

