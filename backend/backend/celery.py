from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("backend")

app.conf.enable_utc = False
app.conf.update(timezone='America/Sao_Paulo')

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")

app.conf.beat_schedule={
    'check-scheduled-emails': {
        'task': 'exam_locations.tasks.send_scheduled_email',
        'schedule': 60.0,  # Checa a cada 60 segundos
    },
}