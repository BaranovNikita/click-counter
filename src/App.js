import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  increment = () => {
    this.setState(state => ({
      counter: state.counter + 1
    }))
  }

  render () {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">{this.state.counter}</h1>
        <button data-test="increment-button" onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default App;
