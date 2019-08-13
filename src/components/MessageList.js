import React, { Component } from 'react'

class MessagesList extends Component {
    render() {
        const styles = {
            container: {
                height: '75vh',
                overflowY: 'scroll',
                // flex: 1,
            },
            ul: {
                listStyle: 'none',
            },
            li: {
                marginTop: 13,
                marginBottom: 13,
            },
            senderUsername: {
                fontWeight: 'bold',
            },
            senderTime: {
                fontWeight: 'lighter',
                color: '#8f94a1',
            },
            message: { fontSize: 15 },
        };

        if (this.props.messages === null) {
            return null;
        }

        return (
            <div
                style={{
                    ...this.props.style,
                    ...styles.container,
                }}
            >
                <ul style={styles.ul}>
                    {this.props.messages.map((message, index) => (
                        <li key={index} style={styles.li}>
                            <div>
                                <span style={styles.senderUsername}>{message.authorName}</span>{' '}
                            </div>
                            <div>
                                <span style={styles.senderTime}>{message.created}</span>{' '}
                            </div>
                            <p style={styles.message}>{message.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MessagesList
