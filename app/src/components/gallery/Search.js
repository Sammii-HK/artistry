import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Navbar from '../common/Navbar'
import Loading from '../common/Loading'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      searchInput: ''
    }

    this.getArt = this.getArt.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.placeholderImage = 'https://screenshotlayer.com/images/assets/placeholder.png'

  }

  getArt() {
    const token = Auth.getToken()
    axios.get('/api/rijksmuseum/collection', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data.artObjects }))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getArt()
  }

  handleChange(e) {
    this.setState({ searchInput: e.target.value || '' })
  }

  onSubmit(e) {

    e.preventDefault()
    const query = this.state.searchInput
    const token = Auth.getToken()
    axios.get('/api/rijksmuseum/collection', {
      params: { query },
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data.artObjects }))
      .catch(err => console.error(err))
  }

  render() {
    if (!this.state.data) return <Loading />
    console.log(this.state.data)
    return (
      <main>
        <Navbar />
        <div className="container images-container">

          <div className="section">
            <div className="columns search-container">
              <div className="column is-12 search-bar">
                <form onSubmit={this.onSubmit}>
                  <input
                    id="searchInput"
                    name="search"
                    type="search"
                    placeholder="search..."
                    className="search "
                    onChange={this.handleChange}
                  />

                  <button
                    type="submit"
                    value="Submit"
                    placeholder="Submit"
                    onClick={this.onSubmit}
                  > Submit </button>
                </form>
              </div>
            </div>



            <div className="columns is-mobile is-multiline">
              {this.state.data.map(art =>
                <div key={art.objectNumber} className="column is-3-desktop is-6-tablet is-half-mobile art-container">
                  <Link to={`/gallery/${art.objectNumber}`}>
                    <div
                      className="art-image"
                      style={{backgroundImage: `url(${art.webImage ? art.webImage.url:this.placeholderImage})` }} >
                      <div className={'is-6 subtitle'}>{art.title}</div>
                    </div>

                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default Search


// <div className={`is-6 ${art.webImage ? '':'placeholder-'}subtitle`}>{art.title}</div>
