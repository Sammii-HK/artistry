import os
from flask import Flask
from pony.orm import Database
from config.environment import db_uri, port

app = Flask(__name__, static_folder='public')
db = Database()
db.bind('postgres', db_uri)

# pylint: disable=W0611,C0413
from controllers import auth, rijksmuseum, favorites

db.generate_mapping(create_tables=True)

# Register blueprints
app.register_blueprint(auth.router, url_prefix='/api')
app.register_blueprint(favorites.router, url_prefix='/api')
app.register_blueprint(rijksmuseum.router, url_prefix='/api')

# Catch-all route
@app.route('/')
@app.route('/<path:path>')
def catch_all(path='index.html'):
    import os
    if os.path.isfile('public/' + path):
        return app.send_static_file(path)
    from flask import abort
    return abort(404)

@app.route('/', methods=['GET'])
def home():
    return 'Hello World!', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(port))
