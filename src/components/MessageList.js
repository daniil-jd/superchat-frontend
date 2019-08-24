import React, { Component } from 'react'
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/ru';


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
        const loc = (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language;
        moment.locale(loc);

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
                                <span style={styles.senderUsername}>{message.authorName}</span>
                            </div>
                            <div>
                                <span style={styles.senderTime}> {moment(new Date(message.created)).calendar()}</span>
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
