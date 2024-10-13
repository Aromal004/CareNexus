from django.db import models
from login_register.models import UserAccount
from django.db import models

class PatientInfo(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    age = models.PositiveIntegerField()
    height = models.FloatField()
    weight = models.FloatField()
    medical_condition = models.CharField(max_length=255)



