from django.db import models
from multiselectfield import MultiSelectField

class ExamLocation(models.Model):
    name = models.CharField(max_length=50)
    exam_capacity = models.IntegerField()

    def __str__(self):
        return self.name

MONTH_CHOICES = [
    ('JAN', 'JANEIRO'),
    ('FEV', 'FEVEREIRO'),
    ('MAR', 'MARÇO'),
    ('ABR', 'ABRIL'),
    ('MAI', 'MAIO'),
    ('JUN', 'JUNHO'),
    ('JUL', 'JULHO'),
    ('AGO', 'AGOSTO'),
    ('SET', 'SETEMBRO'),
    ('OUT', 'OUTUBRO'),
    ('NOV', 'NOVEMBRO'),
    ('DEZ', 'DEZEMBRO'),
]

DAY_CHOICES = [(str(i), str(i)) for i in range(1, 32)]

class Calendar(models.Model):

    days = MultiSelectField(choices=DAY_CHOICES)
    month = models.CharField(max_length=3, choices=MONTH_CHOICES)

    exam_location = models.ForeignKey(ExamLocation, on_delete=models.CASCADE, related_name='calendars')

    def __str__(self):
        return f"{self.month} - {self.exam_location.name}"


class ExamTime(models.Model):
    exam_location = models.ForeignKey(ExamLocation, on_delete=models.CASCADE, related_name='exam_times')
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.exam_location.name} - {self.start_time} to {self.end_time}"

class ExamScheduled(models.Model):
    exam_location = models.ForeignKey(ExamLocation, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    day = models.IntegerField()
    exam_time = models.ForeignKey(ExamTime, on_delete=models.CASCADE)
    exam = models.ForeignKey('exams.Exam', on_delete=models.CASCADE)
    month = models.CharField(max_length=3, choices=MONTH_CHOICES)

    def __str__(self):
        return f"{self.exam_location.name} - {self.user.username} - {self.calendar} - {self.exam_time}"