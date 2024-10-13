
from django.urls import path
from .views import save_patient_info,save_doctor_info

urlpatterns = [
    path('Patient-Details/', save_patient_info, name='save_patient_info'),
    path('doctor-details/', save_doctor_info, name='save_doctor_info'),
]
