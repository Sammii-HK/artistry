import os
import requests
from flask import Blueprint, Response, request
from pony.orm import db_session


router = Blueprint('rijks', __name__)

# route which connects front end to the back end
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


# route which connects front end to the back end
@router.route('/rijksmuseum/collection/<objectNumber>', methods=['GET'])
@db_session
def item(objectNumber):
    api_key = os.getenv('RIJKS_API_KEY')
    # this sets the object number applied to the front end request and sets it onto te Rijks API to search for it
    url = f'https://www.rijksmuseum.nl/api/en/collection/{objectNumber}'
    params = {
        'key': api_key
        }
    req = requests.get(url, params=params)

    print(req.status_code)

    return Response(
        mimetype='application/json',
        response=req.text,
        status=req.status_code
    )
