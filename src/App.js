import React from 'react';
import Header from './components/Header.js';
import GameGrid from './components/GameGrid.js';
import Login from './components/Login.js';
import Box from '@material-ui/core/Box';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState('');

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <Box>
        {loggedIn 
          ? <GameGrid user={user}/>
          : <Login logIn={setLoggedIn} logUser={setUser}/>
        }
      </Box>
    </div>
  );
}

export default App;