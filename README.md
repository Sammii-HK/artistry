# Artistry - SEI Project 4

A full-stack application, which users can search the Rijksmuseum API, with a React front-end and SQL database. The application includes data schema and a RESTful api framework built with Python.

## Details

### Timeframe

7 days

### Technologies Used

* React
* Webpack
* Python
* Pony
* Marshmallow
* Ajax
* JavaScript (ES6)
* HTML5
* Bulma (CSS framework)
* SCSS
* GitHub
* Rijksmuseum API

### App Overview

The app allows users to search through the Rijksmuseum API and view individual items of artwork, users can then save items as a favourite artwork, which can be viewed on their profile page.

[**Live Site**](https://artistry-api-app.herokuapp.com/#/)

![landing-page](https://user-images.githubusercontent.com/40900195/60629156-84f4f700-9dec-11e9-96e9-d19984492111.png)

My initial idea came from there being no obvious central place for artworks from many museums and in time I would incorporate other Museums data to create a larger database to search from.

I wanted to create a minimalist experience which demonstrated the artwork as the main focus of the page. The Magnifier package allows users to interact with the images and takes advantage of the quality of photographs available from the API.

I achieved this with many subtle uses of user interaction on hover states and utilizing packages available with npm, so users can delve deeper into the artworks.

#### Development Process

My first concern when planning my app was my database and organising the one:many relationship I had in mind for users to add favorite art works, allowing a user to store favourite artworks on their profile.

![image](https://user-images.githubusercontent.com/40900195/60629130-70186380-9dec-11e9-9572-f98f13c8e2ba.png)

I chose to use the Rijksmuseum API as it was populated with lots of quality data, but most importantly it included high quality images of most of its artworks.

The application is deployed via Git on Heroku and can be found here: [Artistry](https://artistry-api-app.herokuapp.com/#/)

#### Functionality

On page load I send a fetch request and load up the results on the landing page.

The search feature appends the user input to the search bar, to the API request to create a search query.

Users can save artworks as favourites, it is at this point where my database is populated with the Rijksmuseum API data. On the click event to favourite an artwork, the artwork record is modeled to the data needed for my schemas, to save the data to my database, on the users record.
I map the data and save only the properties needed to display the items on the profile, such as 'title' and 'image url'.

![image](https://user-images.githubusercontent.com/40900195/60984774-296ac200-a334-11e9-9a78-864cb3db8748.png)

### Challenges & Achievements

To populate my database, I needed to obtain the appropriate information from the Rijksmuseum API and save it for the Schema set on my database.

Another challenge was the favorite button, and having a GET and POST request to the favourites, it required saving the user favorites into localStorage so it they are available throughout the website, and clear on log out.

It was also the first search feature I had implemented on a website which calls to an Rijksmuseum API, I used the requests package to handle the requests to the Rijksmuseum API.

![image](https://user-images.githubusercontent.com/40900195/60629164-8aead800-9dec-11e9-80aa-d326dfda7787.png)

```python
# * rijksmuseum.py * #
#route which connects front end to the back end
@router.route('/rijksmuseum/collection')
@db_session
def search():
    # this gets the query applied to the url route request
    query = request.args.get('query')
    api_key = os.getenv('RIJKS_API_KEY')
    url = 'https://www.rijksmuseum.nl/api/en/collection'
    # this uses the requests package to save the parameters
    params = {
        'q': query,
        'ps': '48',
        'key': api_key
    }
    # then apply these paramters onto the url as a request
    req = requests.get(url, params=params)

    print('url', url)

    return Response(
        mimetype='application/json',
        response=req.text,
        status=req.status_code
    )
```

I found making a SQL database in Python, with relationships, quite a challenge so I feel that as my first one that in itself is an achievement and certainly has given me a strong set of skills to build on in the future.

I look forward to applying this knowledge in new projects and advancing it further.

## Future enhancements

Due to the time scale of 7 days, I needed to scale down my ambitions of this app but going forward I would like the web application to incorporate art from around the globe, so that users can search through more results and interact with a greater number of artworks.

I also want to add a feature which shows exactly where in the museum the artwork can be found, and then save these locations on a map, available through the profile page.

Going forward it would be good to make the database more complex, and include features where users can recommend pieces of art to other users or share the item on social networking sites.
