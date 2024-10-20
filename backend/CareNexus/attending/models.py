# attending/models.py
from django.db import models
from login_register.models import UserAccount
from user_info.models import DoctorInfo, PatientInfo

class AttendanceRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    patient = models.ForeignKey(PatientInfo, on_delete=models.CASCADE)
    doctor = models.ForeignKey(DoctorInfo, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    request_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Request from Dr. {self.doctor.user.name} to {self.patient.user.name} ({self.status})"


class PatientStats(models.Model):
    request = models.OneToOneField(AttendanceRequest, on_delete=models.CASCADE)
    blood_pressure = models.CharField(max_length=50)
    heart_rate = models.IntegerField()
    other_notes = models.TextField()

    def __str__(self):
        return f"Stats for {self.request.patient.user.name} (attended by {self.request.doctor.user.name})"
