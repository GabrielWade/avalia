from django.urls import path
from . import views

urlpatterns = [
    path('user_subject/', views.User_subject_view.as_view(), name='user_subject'),
    path('exam/<int:id>/', views.Exam_view.as_view(), name='exam'),
]
