from django.contrib import admin
from .models import Subjects, Exam, Question, Option, Users_subjects

admin.site.register(Subjects)
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Users_subjects)
