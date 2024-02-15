
import React, { useState } from 'react';

function UsernameForm({ setUsername }) {
  const [usernameInput, setUsernameInput] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('username', usernameInput);
    setUsername(usernameInput);
  };

  return (
    <div>
      <h1>Welcome to the Card Game!</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default UsernameForm;
