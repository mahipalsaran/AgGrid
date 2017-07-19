import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AgGridComponent from './AgGridComponent/AgGridComponent'

class App extends Component {
    render() {
        return (
            <div className="App">
        <AgGridComponent />
      </div>
        );
    }
}

export default App;
