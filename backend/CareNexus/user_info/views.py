from django.http import JsonResponse
from django.shortcuts import render  # Import render to serve templates
from django.views.decorators.csrf import csrf_protect
from .models import PatientInfo
from django.contrib.auth.decorators import login_required
import json

@csrf_protect
@login_required  # Ensure only authenticated users can submit
def save_patient_info(request):
    # Handle POST request to save patient information
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)
            age = data.get('age')
            height = data.get('height')
            weight = data.get('weight')
            medical_condition = data.get('medical_condition')

            # Create and save the PatientInfo object
            patient_info = PatientInfo.objects.create(
                user=request.user,  # Use the logged-in user
                age=age,
                height=height,
                weight=weight,
                medical_condition=medical_condition
            )
            patient_info.save()

            return JsonResponse({'status': 'success', 'message': 'Patient info saved successfully!'})

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)

    # Handle GET request to serve a template or any other response
    elif request.method == 'GET':
        return render(request, 'index.html')  # Serve the appropriate HTML template

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
