"""Views for the CMS app."""

from django.views.generic import DetailView, ListView
from .models import Article, FAQ


class ArticleListView(ListView):
    model = Article
    template_name = "cms/article_list.html"
    context_object_name = "articles"
    paginate_by = 10

    def get_queryset(self):
        return Article.objects.filter(status="PUBLISHED")


class ArticleDetailView(DetailView):
    model = Article
    template_name = "cms/article_detail.html"
    context_object_name = "article"
    slug_field = "slug"


class FAQListView(ListView):
    model = FAQ
    template_name = "cms/faq_list.html"
    context_object_name = "faqs"

    def get_queryset(self):
        return FAQ.objects.filter(is_active=True)
