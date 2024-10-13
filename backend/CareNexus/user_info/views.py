from django.http import JsonResponse
from django.shortcuts import render  # Import render to serve templates
from django.views.decorators.csrf import csrf_protect
from .models import PatientInfo
from login_register.models import UserAccount
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
import json

@csrf_protect
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can submit
def save_patient_info(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        age = data.get('age')
        height = data.get('height')
        weight = data.get('weight')
        medical_condition = data.get('medical_condition')

        patient_info = PatientInfo.objects.create(
            user=request.user,
            age=age,
            height=height,
            weight=weight,
            medical_condition=medical_condition
        )
        patient_info.save()

        return JsonResponse({'status': 'success', 'message': 'Patient info saved successfully!'})

    if request.method == 'GET':
        return render(request, 'index.html')  

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
