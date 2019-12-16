from django_filters.rest_framework import DjangoFilterBackend

class ArticleTypesInFilterBackend(DjangoFilterBackend):

    def filter_queryset(self, request, queryset, view):
        types = request.query_params.get('article_type')
        if types:
            types = types.split(",")
            return queryset.filter(article_type__in = types)
        return queryset
