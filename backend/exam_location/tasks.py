from datetime import datetime

from celery import shared_task
from django.core.mail import send_mail

from .models import ScheduledEmail

@shared_task
def send_scheduled_email():
    emails = ScheduledEmail.objects.filter(sent=False, schedule_time__lte=datetime.now())
    for email in emails:
        send_mail(
            subject=email.subject,
            message=email.message,
            from_email="avaliaunifaa@gmail.com",
            recipient_list=[email.email],
        )
        email.sent = True
        email.save()

    return "Emails enviados"