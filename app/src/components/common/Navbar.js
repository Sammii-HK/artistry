import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Favorite from '../../lib/Favorite'

class Navbar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
      searchInput: ''
    }

    this.toggleActive = this.toggleActive.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleActive() {
    this.setState({ active: !this.state.active })
  }

  logout() {
    Auth.removeToken()
    // clear favorites in local storage on log out
    Favorite.clearFavorites()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav className="navbar is-dark" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            {
              /* Navbar branding and burger menu */
            }
            {Auth.isAuthenticated() && <Link to="/search" className="navbar-item is-size-4">Artistry</Link>}
            {!Auth.isAuthenticated() && <Link to="/" className="navbar-item is-size-4">Artistry</Link>}

            <a role="button" className={`navbar-burger ${this.state.active ? ' is-active' : ''}`} onClick={this.toggleActive}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={`navbar-menu${this.state.active ? ' is-active' : ''}`}>
            {/* Everything else */}
            <div className="navbar-start">
              {/* left-hand links */}
            </div>
            <div className="navbar-end">
              {/* right-hand links */}
              {Auth.isAuthenticated() && <Link to='/profile' className="navbar-item">Profile</Link>}
              {Auth.isAuthenticated() && <Link to='/search' className="navbar-item">Search</Link>}
              {!Auth.isAuthenticated() && <Link to='/register' className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to='/login' className="navbar-item">Log in</Link>}
              {Auth.isAuthenticated() && <Link to='/' className="logout navbar-item" onClick={this.logout}>Logout</Link>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
