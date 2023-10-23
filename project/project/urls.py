"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

# Dj Rest Auth - social login [Google] (optional)
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .settings import GOOGLE_CALLBACK_URL
import os

# Google Authorization Code Grant
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = GOOGLE_CALLBACK_URL
    client_class = OAuth2Client


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("backend.urls")),
    # DJ rest auth - registration, social providers [Google]
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("dj-rest-auth/google/", GoogleLogin.as_view(), name="google_login"),
    # React frontend
    re_path(
        r"^.*$", TemplateView.as_view(template_name="index.html")
    ),  # <-- React frontend w/ admin panel
    # re_path(
    #     "", TemplateView.as_view(template_name="index.html")
    # ),  # <-- Disable admin panel
]
