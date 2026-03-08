import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from 'axios'

import FlashMessages from './components/common/FlashMessages'
import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'
import GalleryShow from './components/gallery/GalleryShow'
import Search from './components/gallery/Search'

import SecureRoute from './components/common/SecureRoute'

import 'bulma'

import './style.scss'

class App extends React.Component {

  render() {
    // if(!this.state) return <p>Loading...</p>
    return (
      <Router>
        <FlashMessages />
        <Switch>
          <SecureRoute path="/gallery/:id" component={GalleryShow} />
          <SecureRoute path="/profile" component={Profile} />
          <SecureRoute exact path="/search" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
