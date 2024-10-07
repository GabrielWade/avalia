from django.db import models

class Subjects(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Users_subjects(models.Model):
    class1 = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    auth_user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

class Exam(models.Model):
    class1 = models.ForeignKey(Subjects, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.TextField()

    def __str__(self):
        return self.question

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    option = models.CharField(max_length=255)
    is_right = models.BooleanField(default=False)

    def __str__(self):
        return self.option

