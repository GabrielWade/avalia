from rest_framework import serializers
from .models import ExamLocation, ExamTime, Calendar


class ExamLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamLocation
        fields = ['id', 'name', 'exam_capacity']

class ExamLocationTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamTime
        fields = ['id','exam_location', 'start_time', 'end_time']

class ExamLocationCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'exam_location', 'days', 'month']