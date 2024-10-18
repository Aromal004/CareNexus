from django.contrib import admin
from .models import PatientInfo, DoctorInfo

@admin.register(PatientInfo)
class PatientInfoAdmin(admin.ModelAdmin):
    list_display = ('get_user_email', 'age', 'height', 'weight', 'medical_condition')
    search_fields = ('user__email', 'medical_condition')
    list_filter = ('age', 'medical_condition')
    ordering = ('-age',)

    # Custom method to display user's email in list_display
    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'User Email'

@admin.register(DoctorInfo)
class DoctorInfoAdmin(admin.ModelAdmin):
    list_display = ('get_user_email', 'age', 'speciality', 'hospital')
    search_fields = ('user__email', 'speciality', 'hospital')
    list_filter = ('age', 'speciality')
    ordering = ('-age',)

    # Custom method to display user's email in list_display
    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'User Email'
