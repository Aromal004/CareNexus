# admin.py
from django.contrib import admin
from .models import PatientInfo, DoctorInfo

@admin.register(PatientInfo)
class PatientInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'height', 'weight', 'medical_condition')
    search_fields = ('user__email', 'medical_condition')  # Enables search by user email and medical condition
    list_filter = ('age', 'medical_condition')  # Adds filters for the age and medical condition
    ordering = ('-age',)  # Orders by age descending

@admin.register(DoctorInfo)
class DoctorInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'age', 'speciality', 'hospital')
    search_fields = ('user__email', 'speciality', 'hospital')  # Enables search by user email, specialty, and hospital
    list_filter = ('age', 'speciality')  # Adds filters for the age and specialty
    ordering = ('-age',)  # Orders by age descending
