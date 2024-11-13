from django.urls import path
from . import views

urlpatterns = [
    path('', views.ExamLocationView.as_view(), name='user_subject'),
    path('exam_location_time/<int:id>/', views.ExamLocationTimeView.as_view(), name='exam_location_time'),
    path('exam_location_calendar/<int:id>/', views.ExamLocationCalendarView.as_view(), name='exam_location_calendar'),

]
