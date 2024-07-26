import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Router from './router';

import './style/main.scss'

function App() {
  return (
    <div className="App">
      <Header />
      <div className='blockApp'>
        <Sidebar />
        <Router />
      </div>
    </div>
  );
}

export default App;
