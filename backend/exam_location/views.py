from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ExamLocation, ExamTime, Calendar, ExamScheduled
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

class ExamScheduledView(APIView):
    def post(self, request):
        # Garante que o usuário esteja autenticado
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Usuário não autenticado'}, status=400)

        data = request.data
        exam_location_id = data.get('exam_location')
        calendar_id = data.get('calendar')
        exam_time_id = data.get('exam_time')

        try:
            # Busca os objetos com base nos IDs
            exam_location = ExamLocation.objects.get(id=exam_location_id)
            calendar = Calendar.objects.get(id=calendar_id)
            exam_time = ExamTime.objects.get(id=exam_time_id)
        except ExamLocation.DoesNotExist:
            return Response({'error': 'Local de prova inválido'}, status=400)
        except Calendar.DoesNotExist:
            return Response({'error': 'Calendário inválido'}, status=400)
        except ExamTime.DoesNotExist:
            return Response({'error': 'Horário de prova inválido'}, status=400)

        # Cria o agendamento com o usuário autenticado
        exam_scheduled = ExamScheduled.objects.create(
            exam_location=exam_location,
            user=user,
            calendar=calendar,
            exam_time=exam_time
        )

        return Response({'message': 'Prova agendada com sucesso'}, status=201)
