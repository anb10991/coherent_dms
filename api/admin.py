from django.contrib import admin
from api.models import CustomUser, Category, Article, Revision

admin.site.register(CustomUser)
admin.site.register(Category)
admin.site.register(Article)
admin.site.register(Revision)
