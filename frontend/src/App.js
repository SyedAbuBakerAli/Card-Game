
import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import UsernameForm from './components/UsernameForm';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    localStorage.removeItem('username');

  }, []);
  return (
    <Provider store={store}>
      <div>
        {username ? <Game username={username} /> : <UsernameForm setUsername={setUsername} />}
      </div>
    </Provider>
  );
}

export default App;
