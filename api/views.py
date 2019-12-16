from django.shortcuts import render
from django.contrib.auth.models import User
from django.db.models import Prefetch
from rest_framework import generics, viewsets, response, permissions, status, views, filters

from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from api.models import CustomUser, Category, Article, Revision

from api.serializers import CustomUserSerializer, CategorySerializer, ArticleSerializer, RevisionSerializer, FileSerializer

from api import custompermission

from django.views.decorators.csrf import csrf_exempt

from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from api.pagination import CustomPagination
from api.filters import ArticleTypesInFilterBackend

# Create your views here.
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter, )
    filterset_fields = ('first_name', 'last_name', 'username', 'email', 'occupation', 'phone', )
    search_fields = ('first_name', 'last_name', 'username', 'email', 'occupation', 'phone', )
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticated(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(),)

    def dispatch(self, *args, **kwargs):
        response = super(CustomUserViewSet, self).dispatch(*args, **kwargs)

        # from django.db import connection
        # print('# of Queries: {}'.format(len(connection.queries)))

        return response
    # def retrieve(self, request, pk=None):
    #     if pk == 'i':
    #         return response.Response(CustomUserSerializer(request.user, context={'request': request}).data)

    #     return super(CustomUserViewSet, self).retrieve(request, pk)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (
        permissions.AllowAny,
        permissions.IsAuthenticated,
    )
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, filters.SearchFilter, )
    filterset_fields = ('name', )
    search_fields = ('name', )
    pagination_class = CustomPagination

    def create(self, request):
        data = request.data
        data['created_by'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def dispatch(self, *args, **kwargs):
        response = super(CategoryViewSet, self).dispatch(*args, **kwargs)

        # from django.db import connection
        # print('# of Queries: {}'.format(len(connection.queries)))

        return response

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (
        permissions.AllowAny,
        permissions.IsAuthenticated,
    )
    filter_backends = (DjangoFilterBackend, ArticleTypesInFilterBackend, filters.OrderingFilter, filters.SearchFilter, )
    filterset_fields = ('name', 'category_id', 'is_active', 'is_homepage', )
    search_fields = ('name', )
    pagination_class = CustomPagination
    
    def create(self, request):
        data = request.data
        data['created_by'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def dispatch(self, *args, **kwargs):
        response = super(ArticleViewSet, self).dispatch(*args, **kwargs)

        # from django.db import connection
        # print('# of Queries: {}'.format(len(connection.queries)))

        return response

class RevisionViewSet(viewsets.ModelViewSet):
    queryset = Revision.objects.all()
    serializer_class = RevisionSerializer
    permission_classes = (
        permissions.AllowAny,
        permissions.IsAuthenticated,
    )

    filter_backends = (DjangoFilterBackend, filters.OrderingFilter, )
    filterset_fields = ('article_id', )
    pagination_class = CustomPagination

    def create(self, request):
        data = request.data
        data['created_by'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
    def dispatch(self, *args, **kwargs):
        response = super(RevisionViewSet, self).dispatch(*args, **kwargs)

        # from django.db import connection
        # print('# of Queries: {}'.format(len(connection.queries)))

        return response

class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      print(request.FILES)
      file_serializer = FileSerializer(data=request.FILES)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
