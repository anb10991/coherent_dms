from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=16, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return self.username

class Category(models.Model):

    name = models.CharField(max_length=255)
    created_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='categories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "category"
        verbose_name_plural = "categories"
        ordering = ('name',)

    def __str__(self):
        return self.name

class Article(models.Model):

    ARTICLE_TYPE_CHOICES = (
        ('document', 'document'),
        ('textentry', 'textentry'),
        ('form', 'form'),
    )

    name = models.CharField(max_length=255)
    article_type = models.CharField(choices=ARTICLE_TYPE_CHOICES, max_length=16)
    category_id = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='articles')
    created_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='articles')
    is_active = models.BooleanField(default=True)
    is_homepage = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "article"
        verbose_name_plural = "articles"
        ordering = ('category_id', 'name', )

    def __str__(self):
        return self.name

class Revision(models.Model):

    ARTICLE_TYPE_CHOICES = (
        ('document', 'document'),
        ('textentry', 'textentry'),
        ('form', 'form'),
    )

    content = models.TextField(default='')
    note = models.CharField(max_length=255)
    article_id = models.ForeignKey('Article', on_delete=models.CASCADE, related_name='revisions')
    revision_type = models.CharField(choices=ARTICLE_TYPE_CHOICES, max_length=16)
    created_by = models.ForeignKey('CustomUser', on_delete=models.CASCADE, related_name='revisions')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "revision"
        verbose_name_plural = "revisions"
        ordering = ('created_at', )
    
    def __str__(self):
        return self.content

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    def __str__(self):
        return self.file.name
