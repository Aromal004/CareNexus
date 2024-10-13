
from django.urls import path
from .views import save_patient_info

urlpatterns = [
    path('Patient-Details/', save_patient_info, name='save_patient_info'),
]
