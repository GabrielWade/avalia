from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Users_subjects
from .serializers import UsersSubjectsSerializer

class User_subject(APIView):
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
