import React, { Component } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
import Footer from './components/Footer'
import './App.css'

class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUpdate() {
    console.log('nextProps')
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Grid />
        <Footer />
      </div>
    );
  }
}

export default App
