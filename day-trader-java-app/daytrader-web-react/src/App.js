import React from 'react';
import AppRouter from './router';

const App = () => {
  console.log('dotenv', process.env)
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
