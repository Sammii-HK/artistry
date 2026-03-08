class Favorite {

  // set favorites as an item on local storage
  static setFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  static addFavorite(favorite) {
    // get favorites from local storage
    const favorites = this.getFavorites()
    // add the new object number
    favorites.push(favorite.objectNumber)
    // set the new array of favorites
    this.setFavorites(favorites)
    console.log('add favorites.objectNumber', favorites.objectNumber)
  }

  static removeFavorite(favorite) {
    console.log('REMOVE favorite', favorite)
    // get favorites from local storage
    const favorites = this.getFavorites()
    // get the index of the current favorite item from the array stored in local storage
    const index = favorites.indexOf(favorite.objectNumber)
    // if the indexOf returns false, dont splice,
    // otherwise remove one item from the array at that index
    if (index >= 0 ) favorites.splice(index, 1)
    // set the new array of favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  static getFavorites() {
    // get the favorites from local storage and
    // return them as a JS object with parse
    return JSON.parse(localStorage.getItem('favorites'))
  }

  static isFavorite(favorite) {
    // get favorites from local storage
    const favorites = this.getFavorites()
    // check is the current objectNumber is in local storage
    return favorites.includes(favorite.objectNumber)
  }

  static clearFavorites() {
    // clear favorites from local storage
    localStorage.removeItem('favorites')
  }

}

export default Favorite
