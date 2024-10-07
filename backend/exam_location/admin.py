from django.contrib import admin
from .models import ExamLocation, Calendar, ExamTime

@admin.register(ExamLocation)
class ExamLocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'exam_capacity')


@admin.register(Calendar)
class CalendarAdmin(admin.ModelAdmin):
    list_display = ('month', 'exam_location')



@admin.register(ExamTime)
class ExamTimeAdmin(admin.ModelAdmin):
    list_display = ('exam_location', 'start_time', 'end_time')
