import React, { Component } from 'react';
import './App.css';
import Header from './routes/Header';
import Main from './routes/Main';

class App extends Component {
  render() {
    return (
      <div className="imperius-container">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
