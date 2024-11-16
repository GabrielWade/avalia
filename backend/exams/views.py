from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Users_subjects, Exam
from .serializers import UsersSubjectsSerializer, ExamSerializer

class User_subject_view(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user_id = request.user.id
            user_name = request.user.username

            users_subjects = Users_subjects.objects.filter(auth_user_id=user_id)

            serializer_users_subjects = UsersSubjectsSerializer(users_subjects, many=True)

            return Response({
                'user_id': user_id,
                'user_name': user_name,
                'subjects': serializer_users_subjects.data
            }, status=200)
        else:
            return Response({'error': 'Usuário não autenticado'}, status=401)

class Exam_view(APIView):  # Renomeando para ExamView
    def get(self, request, id):
        exam = Exam.objects.filter(subject_id=id)
        serializer_exam = ExamSerializer(exam, many=True)
        return Response(serializer_exam.data, status=200)



