# Generated by Django 4.2.16 on 2024-11-13 00:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exam_location', '0003_alter_calendar_days_alter_calendar_month'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExamScheduled',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exam_location.calendar')),
                ('exam_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exam_location.examlocation')),
                ('exam_time', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exam_location.examtime')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]