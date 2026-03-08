import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Favorite from '../../lib/Favorite'
import Magnifier from 'react-magnifier'

import Navbar from '../common/Navbar'
import Loading from '../common/Loading'

class GalleryShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      favorites: Favorite.getFavorites()
    }

    this.handleFavourite = this.handleFavourite.bind(this)
    this.getArtItem = this.getArtItem.bind(this)
  }

  // handle favorites
  handleFavourite() {
    const token = Auth.getToken()
    const image = this.state.data.webImage.url
    const { objectNumber, title } = this.state.data
    const favorite = { objectNumber: objectNumber, title, image }

    // if the selected item is already in favorites
    if(Favorite.isFavorite(favorite)) {
      // remove the favorite
      axios.delete(`/api/favorites/${this.props.match.params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(() => Favorite.removeFavorite(favorite))
        .then(() => this.setState({ favorites: Favorite.getFavorites() }))
    } else {
      // add the favorite
      axios.post('/api/favorites', favorite, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(() => Favorite.addFavorite(favorite))
        .then(() => this.setState({ favorites: Favorite.getFavorites() }))
    }
  }

  // get a specific art item, this is the front end request to the back end, that checks the object number parameter on props
  getArtItem() {
    const token = Auth.getToken()
    axios.get(`/api/rijksmuseum/collection/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data.artObject }))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getArtItem()
  }

  render() {
    if (!this.state.data) return <Loading />
    return (
      <main>
        <Navbar />
        <div className="container">
          <div className="section">
            <div className="fav-icon">
              <i
                className={`${Favorite.isFavorite(this.state.data) ? 'fas fa-heart fa-3x' : 'far fa-heart fa-3x'}`}
                aria-hidden="true"
                onClick={this.handleFavourite}></i>
            </div>
            <div className="columns is-multiline is-centered">
              <div className="column is-12-desktop is-10-tablet is-11-mobile">
                <div className="columns is-multiline is-centered">

                  {this.state.data.webImage &&
                    <div className="column is-8 image-col">
                      <Magnifier
                        src={this.state.data.webImage.url}
                        width={500}
                        mgWidth={250}
                        mgHeight={250}
                        zoomFactor={2} />
                    </div>
                  }

                  <div className="column is-8 is-11-mobile">
                    <div className="title is-4">{this.state.data.title}</div>
                    <div className="subtitle is-4 has-text-right">{this.state.data.principalOrFirstMaker}</div>
                    <p>{this.state.data.plaqueDescriptionEnglish}</p>
                    <hr />

                    <div className="level">
                      <div className="level-item">Presented: {this.state.data.dating.presentingDate}</div>
                      <div className="level-item">{this.state.data.physicalMedium}</div>
                    </div>

                    <hr />


                    <div className="columns is-multiline is-mobile">
                      {this.state.data.colors.map(color =>
                        <div key={color.hex} className="column is-3-mobile is-4-tablet">
                          <div
                            className="color-box"
                            style={{ backgroundColor: color.hex }} >
                          </div>
                          <p className="color">{color.hex}</p>
                        </div>
                      )}
                    </div>
                    <hr />


                    {this.state.data.materials &&
                      <div className="columns is-multiline is-mobile">
                        {this.state.data.materials.map(material =>
                          <div key={material} className="column">
                            <p className="has-text-centered">{material}</p>
                          </div>
                        )}
                      </div>
                    }

                    <hr />

                    {this.state.data.location &&
                    <p className="is-size-5 has-text-weight-semibold">Location in the Rijksmuseum: {this.state.data.location}</p> }

                    <hr />

                    {this.state.data.dimensions &&
                      <div className="columns is-multiline is-mobile">
                        <h4 className="column is-12 has-text-weight-semibold">Dimensions:</h4>
                        {this.state.data.dimensions.map(dimension =>
                          <div key={dimension.value} className="column">
                            <div className="dimension-box">
                              <p>{dimension.type}:  {dimension.value}  {dimension.unit}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    }

                    {this.state.data.classification.people.length > 0 &&
                      <div className="columns is-multiline is-mobile people-col">
                        <h4 className="column is-12 has-text-weight-semibold">People depicted:</h4>
                        {this.state.data.classification.people.map(person =>
                          <div key={person} className="column is-4">
                            <p>{person}</p>
                          </div>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default GalleryShow


{
// <div
//   className="image"
//   style={{ backgroundImage: `url(${this.state.data.webImage.url})` }} >
// </div>
}


// {this.state.data.dimensions.map(dimension =>
//   <div key={dimension.value, dimension.value, dimension.unit} className="column">
//     <div className="dimension-box">
//       <p>{dimension}</p>
//     </div>
//   </div>
// )}
