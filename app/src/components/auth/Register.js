import React from 'react'
import axios from 'axios'

import Navbar from '../common/Navbar'

class Register extends React.Component {

  constructor() {
    super()

    this.state = {
      userData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: { name, value }}) {
    const userData = {...this.state.userData, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ userData, errors })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/register', this.state.userData)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }) )
  }

  render() {
    return (
      <main>
        <Navbar />
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half-desktop is-two-thirds-tablet">
                <div className="title is-3">Register</div>
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                      <input
                        className="input"
                        name="username"
                        placeholder="eg: emma"
                        onChange={this.handleChange}
                        value={this.state.userData.username || ''}
                      />
                    </div>
                    {this.state.errors.username && (<div className="help is-danger">{this.state.errors.username}</div>)}
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        name="email"
                        placeholder="eg: emma@email.com"
                        onChange={this.handleChange}
                        value={this.state.userData.email || ''}
                      />
                    </div>
                    {this.state.errors.email && (<div className="help is-danger">{this.state.errors.email}</div>)}
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
                        value={this.state.userData.password || ''}
                      />
                    </div>
                    {this.state.errors.password && (<div className="help is-danger">{this.state.errors.password}</div>)}
                  </div>
                  <div className="field">
                    <label className="label">Password Confirmation</label>
                    <div className="control">
                      <input
                        className="input"
                        name="password_confirmation"
                        type="password"
                        placeholder="eg: ••••••••"
                        onChange={this.handleChange}
                        value={this.state.userData.password_confirmation || ''}
                      />
                    </div>
                    {this.state.errors.password && (<div className="help is-danger">{this.state.errors.password}</div>)}
                  </div>
                  <button className="button is-info is-medium is-rounded">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default Register
