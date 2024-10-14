# login_register/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from .models import UserAccount
from user_info.models import PatientInfo, DoctorInfo

class UserAccountAdmin(BaseUserAdmin):
    # The fields to be used in displaying the User model.
    list_display = ('email', 'name', 'phone', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    
    # The fields shown when you click to edit a user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),  # Basic user fields
        (_('Personal Info'), {'fields': ('name', 'phone')}),  # Personal info
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),  # Permissions
        (_('Important dates'), {'fields': ('last_login',)}),  # Dates like last login
    )

    # Fields for adding a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'phone', 'password1', 'password2'),
        }),
    )
    
    search_fields = ('email', 'name', 'phone')
    ordering = ('email',)
    filter_horizontal = ()

    # Override delete_model to handle related PatientInfo and DoctorInfo
    def delete_model(self, request, obj):
        # Manually delete related PatientInfo and DoctorInfo before deleting the user
        PatientInfo.objects.filter(user=obj).delete()
        DoctorInfo.objects.filter(user=obj).delete()
        super().delete_model(request, obj)  # Call parent class's delete method

    # Handle bulk deletion of users in admin interface
    def delete_queryset(self, request, queryset):
        # Delete related records for each user in the queryset
        for user in queryset:
            PatientInfo.objects.filter(user=user).delete()
            DoctorInfo.objects.filter(user=user).delete()
        super().delete_queryset(request, queryset)  # Call parent class's delete method for bulk delete

# Register the UserAccount model with the custom admin settings
admin.site.register(UserAccount, UserAccountAdmin)
