# Generated by Django 4.2.16 on 2024-10-06 01:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0002_users_classes'),
    ]

    operations = [
        migrations.RenameField(
            model_name='exam',
            old_name='class_id',
            new_name='class1',
        ),
        migrations.RenameField(
            model_name='option',
            old_name='question_id',
            new_name='question',
        ),
        migrations.RenameField(
            model_name='question',
            old_name='exam_id',
            new_name='exam',
        ),
        migrations.RenameField(
            model_name='users_classes',
            old_name='auth_user_id',
            new_name='auth_user',
        ),
        migrations.RenameField(
            model_name='users_classes',
            old_name='class_id',
            new_name='class1',
        ),
    ]
