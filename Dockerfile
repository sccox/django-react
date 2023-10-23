FROM python:3.9-alpine

RUN apk upgrade -q --no-cache && \
    apk update && \
    apk add --no-cache curl \
    gcc \
    libpq-dev \
    musl-dev \
    nodejs \
    npm

ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./requirements.txt /app

RUN pip install --upgrade pip \
    pip install -r requirements.txt

COPY ./project /app

WORKDIR /app/frontend

ARG REACT_APP_STAGE_ARG

ENV REACT_APP_STAGE=$REACT_APP_STAGE_ARG

RUN npm i

RUN REACT_APP_STAGE=${REACT_APP_STAGE} npm run build

WORKDIR /app

CMD python manage.py runserver 0.0.0.0:80
