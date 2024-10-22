# attending/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('send-request/', views.send_request_to_patient, name='send_request_to_patient'),
    path('respond-request/<int:request_id>/', views.patient_respond_to_request, name='patient_respond_to_request'),
    path('update-stats/<int:request_id>/', views.doctor_update_patient_stats, name='doctor_update_patient_stats'),
    path('pending-requests/', views.get_pending_requests, name='get_pending_requests'),
    path('accepted-requests/', views.get_accepted_requests, name='get_accepted_requests'),
]
