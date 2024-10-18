from django.http import JsonResponse
from django.shortcuts import render  # Import render to serve templates
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
import json
from .models import PatientInfo, DoctorInfo


@csrf_protect
@login_required  # Ensure only authenticated users can submit
def save_patient_info(request):
    """Handles saving patient information for the logged-in user."""
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)
            age = data.get('age')
            height = data.get('height')
            weight = data.get('weight')
            medical_condition = data.get('medical_condition')

            # Create and save the PatientInfo object linked to the logged-in user
            patient_info = PatientInfo.objects.create(
                user=request.user,  # Use the logged-in user
                age=age,
                height=height,
                weight=weight,
                medical_condition=medical_condition
            )
            patient_info.save()

            return JsonResponse({'status': 'success', 'message': 'Patient info saved successfully!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    elif request.method == 'GET':
        # Serve the appropriate HTML template on GET request
        return render(request, 'index.html')

    # Return an error for invalid request methods
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_protect
@login_required  # Ensure only authenticated users can submit
def save_doctor_info(request):
    """Handles saving doctor information for the logged-in user."""
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)
            age = data.get('age')
            speciality = data.get('speciality')
            hospital = data.get('hospital')

            # Create a new DoctorInfo instance linked to the logged-in user
            doctor_info = DoctorInfo.objects.create(
                user=request.user,  # Use the logged-in user
                age=age,
                speciality=speciality,
                hospital=hospital,
            )
            doctor_info.save()

            return JsonResponse({'status': 'success', 'message': 'Doctor info saved successfully!'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    # Return an error for invalid request methods
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)



@login_required
def display_user_info(request):
    try:
        print(f"Fetching info for user: {request.user}")  # Add this line for debugging
        # Check if the user has patient information
        try:
            patient_info = PatientInfo.objects.get(user=request.user)
            data = {
                'user_type': 'patient',
                'age': patient_info.age,
                'height': patient_info.height,
                'weight': patient_info.weight,
                'medical_condition': patient_info.medical_condition,
            }
        except PatientInfo.DoesNotExist:
            print(f"No patient info found for user: {request.user}")  # Add this line
            # If no patient info exists, check if the user is a doctor
            try:
                doctor_info = DoctorInfo.objects.get(user=request.user)
                data = {
                    'user_type': 'doctor',
                    'age': doctor_info.age,
                    'speciality': doctor_info.speciality,
                    'hospital': doctor_info.hospital,
                }
            except DoctorInfo.DoesNotExist:
                print(f"No doctor info found for user: {request.user}")  # Add this line
                return JsonResponse({'status': 'error', 'message': 'User information not found'}, status=404)

        # Return the user info as JSON for the React frontend
        return JsonResponse({'status': 'success', 'data': data}, status=200)

    except Exception as e:
        print(f"Error: {str(e)}")  # Add this line
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
