from pony.orm import Required
from marshmallow import Schema, fields

from app import db

class Favorite(db.Entity):
    title = Required(str)
    image = Required(str)
    objectNumber = Required(str)
    user = Required('User')


class FavoriteSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    image = fields.Str(required=True)
    objectNumber = fields.Str(required=True)
