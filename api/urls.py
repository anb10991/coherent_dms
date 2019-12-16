from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from api.views import CustomUserViewSet, CategoryViewSet, ArticleViewSet, RevisionViewSet, FileUploadView
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()


class EchoView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'revisions', RevisionViewSet)

urlpatterns = router.urls

urlpatterns += [
    url(r'^echo/$', EchoView.as_view()),
    url(r'^upload/', FileUploadView.as_view()),
    # url(r'^photos/(?P<pk>\d+)$', views_photo.PhotoDetailView.as_view(), name='photo-detail'),
    # url(r'^photos/$', views_photo.PhotoListView.as_view(), name='photo-list'),
    # url(r'^comments/$', views_comment.CommentListView.as_view(), name='comment-list-create'),
]
