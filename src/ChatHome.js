import React, {useState, useEffect, useContext} from 'react';
import { useHistory } from "react-router-dom";

import Layout from './Layout';

import SocketContext from './context/SocketContext';

export default () => {
    const [username, setUsername] = useState("");
    const [group, setGroup] = useState("Javascript");
    const [groupUsers, setGroupUsers ] = useState([]);
    const socket = useContext(SocketContext);

    let history = useHistory();
    
    const joinGroupSubmitHandler = (e) => {
        e.preventDefault();
        
        socket.emit('joinGroup', { username, group });
    
        // Get message
        socket.on('message', message => {
            console.log(message);
    
        });

        history.push({
            pathname: "/chat",
            state: {username, group, groupUsers}
        })
    }


    const outputGroupName = (group) => {
        console.log("group", group)
        // roomName.innerText = room;
    }

    const outputUsers = (users) => {
        console.log("users", users)
        setGroupUsers(users)
    }
  
    return (
        <Layout>
              <form onSubmit={joinGroupSubmitHandler}>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        value={username}
                        id="username"
                        placeholder="Enter username..."
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="group">Group</label>
                    <select id="group" value={group} onChange={e => setGroup(e.target.value)}>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="Node">Node</option>
                        <option value="Express">Express</option>
                        <option value="MySQL">MySQL</option>
                        <option value="Mongo">Mongo</option>
                    </select>
                </div>
                <button type="submit" className="btn">Join Group</button>
            </form>
        </Layout>
    );
}