from django.urls import path
from . import views

urlpatterns = [
    path('user_subject/', views.User_subject.as_view(), name='user_subject'),
]
