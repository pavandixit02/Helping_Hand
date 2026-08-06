"""Views for the communication app."""

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import DetailView, ListView

from .models import Conversation, Notification


class ConversationListView(LoginRequiredMixin, ListView):
    model = Conversation
    template_name = "communication/conversation_list.html"
    context_object_name = "conversations"
    paginate_by = 20


class ConversationDetailView(LoginRequiredMixin, DetailView):
    model = Conversation
    template_name = "communication/conversation_detail.html"
    context_object_name = "conversation"


class NotificationListView(LoginRequiredMixin, ListView):
    model = Notification
    template_name = "communication/notification_list.html"
    context_object_name = "notifications"
    paginate_by = 30
