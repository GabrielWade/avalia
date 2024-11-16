from rest_framework import serializers
from .models import Users_subjects, Subjects, Exam

class UsersSubjectsSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)

    class Meta:
        model = Users_subjects
        fields = ['id', 'auth_user', 'subject', 'subject_name']

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'