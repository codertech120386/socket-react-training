import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import socketIOClient from "socket.io-client"; 

import ChatHome from './ChatHome';
import Chat from './Chat';

import SocketContext from './context/SocketContext';

import './App.css';

const ENDPOINT = "http://127.0.0.1:3001";

const socket = socketIOClient(ENDPOINT)

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
            <Route path="/" exact component={ChatHome} />
            <Route path="/chat" exact component={Chat} />
          </Switch>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
