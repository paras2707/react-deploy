import React from 'react'
import NavBar from './navbar'
import Main from './main'
import Footer from './footer'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 60,
      item: {},
      saving: 0
    }
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({ count: prevState.count - 1 <= 0 ? 60 : prevState.count - 1 }))
    }, 1000)

    fetch("https://api.wazirx.com/api/v2/tickers")
      .then(response => response.json())
      .then(data => {
        this.setState(() => ({
          item: data.btcinr,
          saving: data.btcinr.sell - data.btcinr.buy,
          diff: (((data.btcinr.sell - data.btcinr.buy) / data.btcinr.buy) * 100).toFixed(2)
        }))
      })

    this.fetchData = setInterval(() => {
      fetch("https://api.wazirx.com/api/v2/tickers")
        .then(response => response.json())
        .then(data => {
          this.setState(() => ({
            item: data.btcinr,
            saving: data.btcinr.sell - data.btcinr.buy,
            diff: (((data.btcinr.sell - data.btcinr.buy) / data.btcinr.buy) * 100).toFixed(2)
          }))
        })
    }, 60000)
  }

  render() {
    return (
      <div className="App">
        <NavBar counter={this.state.count} />
        <Main item={this.state.item} saving={this.state.saving} diff={this.state.diff} />
        <Footer />
      </div>
    )
  }
}

export default App;
