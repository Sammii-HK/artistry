from pony.orm import db_session
from app import db
from models.User import User, UserSchema
from models.Favorite import Favorite#, FavoriteSchema

db.drop_all_tables(with_all_data=True)
db.create_tables()

with db_session():

    schema = UserSchema()

    sammii = User(
        username="sammii",
        email="sam@email.com",
        password_hash=schema.generate_hash('pass')
    )

    char = User(
        username="char",
        email="char@email.com",
        password_hash=schema.generate_hash('pass')
    )

    Favorite(
        title="Night's Watch",
        image="https://lh3.googleusercontent.com/J-mxAE7CPu-DXIOx4QKBtb0GC4ud37da1QK7CzbTIDswmvZHXhLm4Tv2-1H3iBXJWAW_bHm7dMl3j5wv_XiWAg55VOM=s0",
        objectNumber="SK-C-5",
        user=sammii
    )

    db.commit()
