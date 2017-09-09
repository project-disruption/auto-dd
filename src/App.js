import React, { Component } from 'react';
import './App.css';
import Header from './Header'

class App extends Component {
  render() {
    const title = 'Auto DD'
    return (
      <div className="App">
        <Header title={title}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
