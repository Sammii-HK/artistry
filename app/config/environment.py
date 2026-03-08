import os

secret = os.getenv('SECRET', 'a super sceret secret of course')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/artistry-db')
port = os.getenv('PORT', '4000')
