import React, { Component } from 'react'
import Header from './components/Header'
import Grid from './components/Grid'
import Footer from './components/Footer'
import Records from './components/Records'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="game-wrapper">
          <Header />
          <Grid />
          <Footer />
        </div>
        <Records />
      </div>
    )
  }
}

export default App
