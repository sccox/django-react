from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
BASE_DIR = Path(__file__).resolve().parent.parent

import os
load_dotenv()
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

if os.getenv("DJANGO_ENVIRONMENT_STAGE") == "staging":
    DEBUG = True
    ALLOWED_HOSTS = ["staging01-django-react-boilerplate.net"]
    GOOGLE_CALLBACK_URL = "http://staging01-django-react-boilerplate.net/login/callback"
elif os.getenv("DJANGO_ENVIRONMENT_STAGE") == "production":
    DEBUG = True
    ALLOWED_HOSTS = ["django-react-boilerplate.net"]
    GOOGLE_CALLBACK_URL = "http://django-react-boilerplate.net/login/callback"
else:
    

    
    DEBUG = True
    ALLOWED_HOSTS = ["localhost"]
    GOOGLE_CALLBACK_URL = "http://localhost:3000/login/callback"
    print("DEV MODE ACTIVE")


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "backend",
    "frontend",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    # DJ rest auth
    "rest_framework.authtoken",
    "dj_rest_auth",
    # DJ rest auth - registration
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    # DJ rest auth - social providers [Google]
    "allauth.socialaccount.providers.google",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "frontend/build",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}



# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"
STATICFILES_DIRS = [
    BASE_DIR / "frontend/build/static",
    BASE_DIR / "frontend/assets",
]


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


SIMPLE_JWT = {
    "SIGNING_KEY": os.environ["JWT_SIGNING_KEY"],
    # "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    # "REFRESH_TOKEN_LIFETIME": timedelta(days=90),
    # "ROTATE_REFRESH_TOKENS": True,
    # "BLACKLIST_AFTER_ROTATION": True,
    # "UPDATE_LAST_LOGIN": False,
    # "ALGORITHM": "HS256",
    # "VERIFYING_KEY": None,
    # "AUDIENCE": None,
    # "ISSUER": None,
    # "JWK_URL": None,
    # "LEEWAY": 0,
    # "AUTH_HEADER_TYPES": ("Bearer",),
    # "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    # "USER_ID_FIELD": "username",
    # "USER_ID_CLAIM": "user_username",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.JWTStatelessUserAuthentication",
    # "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # "TOKEN_TYPE_CLAIM": "token_type",
    # "JTI_CLAIM": "jti",
    # "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    # "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    # "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
}


# JWT STUFF
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://django-react-boilerplate.net",
    "http://staging01-django-react-boilerplate.net"
]

# DJ rest auth - registration (optional)
SITE_ID = 1

# !!!!!!!!!!!!!! RENAME THESE COOKIE NAMES TO SOMETHING UNIQUE !!!!!!!!!!!!!!

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
}

# DJ rest auth - JWT (optional)

# JWT_AUTH_SECURE = False  # Set to True in production (https only)
CSRF_COOKIE_NAME = "_CSRF_001"
SESSION_COOKIE_NAME = "_SESSION_ID_001"
JWT_AUTH_COOKIE = "_JWT_001"
JWT_AUTH_REFRESH_COOKIE = "_JWT_REF_001"

REST_USE_JWT = True
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("dj_rest_auth.jwt_auth.JWTCookieAuthentication",)
}

REST_AUTH_REGISTER_PERMISSION_CLASSES = ("rest_framework.permissions.IsAuthenticated",)

REST_AUTH_SERIALIZERS = {
    "USER_DETAILS_SERIALIZER": "backend.serializers.UserSerializer"
}


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
        "APP": {
            "client_id": os.getenv("GOOGLE_OAUTH_CLIENT_ID"),
            "secret": os.getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
            "key": "",
        },
    }
}
