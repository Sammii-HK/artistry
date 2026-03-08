FROM python:3.10-alpine AS builder

RUN pwd

WORKDIR /app

COPY ./Pipfile /app/Pipfile
COPY ./Pipefile.lock /app/Pipfile.lock
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN --mount=type=cache,target=/root/.cache/pip pip install pipenv
RUN yarn


COPY ./src ./src
COPY ./models ./models
COPY ./config ./config
COPY ./lib ./lib
COPY ./controllers ./controllers

COPY app.py ./app.py

ENTRYPOINT [ "python" ]
CMD [ "app.py" ]
