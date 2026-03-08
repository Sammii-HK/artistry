import os
from flask import Flask
from pony.orm import Database
from config.environment import db_uri, port

app = Flask(__name__, static_folder='public')
db = Database()
db.bind('postgres', db_uri)

# pylint: disable=W0611,C0413
from config import routes

db.generate_mapping(create_tables=True)

@app.route('/', methods=['GET'])
def home():
    return 'Hello World!', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(port))
