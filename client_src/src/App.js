import React, { Component } from 'react';
import './App.css';
import Main from './component/Main';
import Footer from './component/Footer';

class App extends Component {
  render() {
    return (
      <div>        
        <Main /><br/>
        <Footer />
      </div>
    );
  }
}

export default App;
