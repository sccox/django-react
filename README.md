# DEMO Notes

## Dev Environment

- clone repo
- create your own dev branch
- add `.env` to base with the following env vars:
```
POSTGRES_PASSWORD=""
DJANGO_SECRET_KEY="test"
GOOGLE_OAUTH_CLIENT_ID=""
GOOGLE_OAUTH_CLIENT_SECRET=""
JWT_SIGNING_KEY="test"
DJANGO_ENVIRONMENT_STAGE=''
```
- in the root folder with a virtual python env active, run `pip install -r requirements.txt`
- start the api with `python manage.py runserver`
- navigate to the frontend and run `npm i`
- start the frontend with `npm start`

## Logging in without google for dev
- in settings.py change all of the BOILERPLATE cookies to have a unique name specific to your app (this app should be `DJANGO_REACT_DEMO`):
```
CSRF_COOKIE_NAME = '<appname>_CSRF_001'
SESSION_COOKIE_NAME = '<appname>SESSION_ID_001'
JWT_AUTH_COOKIE = "<appname>_JWT_001"
JWT_AUTH_REFRESH_COOKIE = "<appname>_JWT_REF_001"
```
- run `python manage.py createsuperuser` and follow the instructions
- with the api running, go to `http://localhost:8000/dj-rest-auth/login/`
- enter your username and password
- navigate to `http://localhost:3000`, refresh, and you should be logged in. If not, check that the cookies were correctly stored in the applications section of the browser inspector.

