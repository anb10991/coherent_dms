"""donutcompany URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.views import generic
from rest_framework_swagger.views import get_swagger_view
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^$', generic.RedirectView.as_view(url='/api/', permanent=False)),
    url(r'^auth/', include(('rest_framework.urls', 'rest_framework'), namespace='rest_framework')),
    url(r'^auth/obtain-auth-token/$', obtain_jwt_token),
    url(r'^auth/refresh-auth-token/$', refresh_jwt_token),
    url(r'^auth/verify-auth-token/$', verify_jwt_token),
    url(r'^api/docs', get_swagger_view(title='Coherent DMS API Documentation')),
    url(r'^api/v1/', include(('api.urls', 'api'), namespace='api')),
    url(r'^$', TemplateView.as_view(template_name='index.html')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
