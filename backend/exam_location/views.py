from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ExamLocation, ExamTime, Calendar
from .serializers import ExamLocationSerializer, ExamLocationTimeSerializer, ExamLocationCalendarSerializer

class ExamLocationView(APIView):
    def get(self, request):
        exam_location = ExamLocation.objects.all()
        serializer = ExamLocationSerializer(exam_location, many=True)  # Serializa os dados
        return Response({'exam_location': serializer.data}, status=200)


class ExamLocationTimeView(APIView):
    def get(self, request, id):
        exam_location_time = ExamTime.objects.filter(exam_location=id)
        serializer = ExamLocationTimeSerializer(exam_location_time, many=True)
        return Response({'exam_location_time': serializer.data}, status=200)

class ExamLocationCalendarView(APIView):
    def get(self, request, id):
        exam_location_calendar = Calendar.objects.filter(exam_location=id)
        serialize = ExamLocationCalendarSerializer(exam_location_calendar, many=True)
        return Response({'calendars': serialize.data}, status=200)