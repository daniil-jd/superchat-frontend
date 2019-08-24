import React, { Component } from 'react'

class SideChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
        };
    }

    render() {
        const {rooms} = this.props;
        const {ws} = this.props;
        return (
            <div className="list-group">
                {rooms.map((room, index) => {
                    return (
                        <SideChatListItem key={index}
                                            name = {room.name}
                                            ws = {ws}
                        >
                        </SideChatListItem>
                    )
                })}
            </div>
        )
    }
}

class SideChatListItem extends Component {
    render() {
        const roomName = this.props.name;
        const webSocket = this.props.ws;
        const styles = {
            li: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 2,
                marginBottom: 2,
                paddingTop: 1,
                paddingBottom: 1,
            },
            div: {
                borderRadius: '50%',
                width: 11,
                height: 11,
                marginRight: 2,
            },
        };
        return (
            <a href="#" className="list-group-item list-group-item-action" onClick={(evt, name, ws) => this.onClick(evt, roomName, webSocket)}>
                <div style={{
                        ...styles.div,
                    }}
                >{roomName}</div>
            </a>
        )
    }

    onClick = (evt, name, ws) => {
        evt.preventDefault();

        console.log(this.props.ws);
        if (this.props.ws === null) {
            return;
        }

        if (ws === null && ws.readyState !== WebSocket.OPEN) {
            return;
        }

        try {
            ws.send(JSON.stringify({
                id: 0,
                authorName: localStorage.getItem('username'),
                roomName: name,
                message: 'get all room messages',
                created: (new Date().getTime()),
                status: 'GET_ALL_CHAT_MESSAGES'
            }));
            console.log('send!')
        } catch (e) {
            console.log('send error')
        }
    }
}

export default SideChatList