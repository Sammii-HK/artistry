import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Favorite from '../../lib/Favorite'
import Navbar from '../common/Navbar'
import Flash from '../../lib/Flash'


class Login extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
        // set the favorites from user db profile into local storage
        Favorite.setFavorites(res.data.favorites)
        this.props.history.push('/profile')
      })
      .catch(err => this.setState({ errors: err.response.data.error }))
  }

  render() {
    console.log(this.state.errors)
    return (
      <main>
        <Navbar />
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet">
                <div className="title is-3">Login</div>
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        placeholder="eg: emma@email.com"
                        onChange={this.handleChange}
                      />
                    </div>


                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        name="password"
                        type="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange}
                      />
                    </div>


                  </div>

                  <button className="button is-info is-medium is-rounded">Submit</button>
                </form>
                <div className="section has-text-centered">
                  <p className="is-size-5">Need an account? <Link to='/register'>Register</Link> now</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Login



// {this.state.errors.username && (<div className="help is-danger">{this.state.errors.username}</div>)}


// {this.state.errors.password && (<div className="help is-danger">{this.state.errors.password}</div>)}
