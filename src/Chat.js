import React, {useEffect, useState, useContext} from 'react';

import SocketContext from './context/SocketContext';


export default (props) => {
    const [groupUsers, setGroupUsers ] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const username = props.location.state.username;
    const group = props.location.state.group;

    const socket = useContext(SocketContext);

    useEffect(() => {
        // Get room and users
        socket.on('groupUsers', ({ group, users }) => {
            outputUsers(users);
        });

        // Message from server
        socket.on('message', message => {
            outputMessage(message);
        });
    })

    const outputUsers = (users) => {
        setGroupUsers(users)
    }

    const outputMessage = (message) => {
        let newMessages = messages
        let finalMessages = newMessages.concat(message)
        setMessages(finalMessages)
    }

    const chatMessageSubmitHandler = e => {
        e.preventDefault();

        // Emit message to server
        socket.emit('chatMessage', message);
    }

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1><i className="fas fa-smile"></i> Masai School</h1>
            </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                <h3><i className="fas fa-comments"></i> Group Name:</h3>
                <h2 id="room-name">{group}</h2>
                <h3><i className="fas fa-users"></i> Users</h3>
                <ul id="users">
                    {groupUsers.map(user => (
                        <li>{user.username}</li>
                    ))}
                </ul>
                </div>
                <div className="chat-messages">
                    {messages.map(message => (
                        <div>
                            <div>
                                {message.username} sent on {message.time}
                            </div>
                            <div>
                                {message.text}
                            </div>
                            <br></br>
                        </div>
                    ))}
                </div>
            </main>
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={chatMessageSubmitHandler}>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button className="btn">
                        <i className="fas fa-paper-plane"></i> 
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}