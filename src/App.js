import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0,
      error: null
    }
  }

  increment = () => {
    if (this.state.error) {
      this.setState(state => ({
        counter: state.counter + 1,
        error: null,
      }))
    } else {
      this.setState(state => ({
        counter: state.counter + 1
      }))
    }
  }

  decrement = () => {
    if (this.state.counter > 0) {
      this.setState(state => ({
        counter: state.counter - 1
      }))
    } else {
      this.setState({
        error: 'The counter can\'t go below zero'
      })
    }
  }

  render () {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">{this.state.counter}</h1>
        {this.state.error && <h3 data-test="error">{this.state.error}</h3>}
        <button data-test="increment-button" onClick={this.increment}>Increment</button>
        <button data-test="decrement-button" onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default App;
