from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from .models import AttendanceRequest, PatientStats
from user_info.models import DoctorInfo, PatientInfo
from login_register.models import UserAccount
import json

@require_http_methods(["POST"])
def send_request_to_patient(request):
    doctor = get_object_or_404(DoctorInfo, user=request.user)

    # Parse the JSON body
    data = json.loads(request.body)
    patient_email = data.get('patient_email')

    try:
        patient_user = UserAccount.objects.get(email=patient_email)
        patient = PatientInfo.objects.get(user=patient_user)
    except (UserAccount.DoesNotExist, PatientInfo.DoesNotExist):
        return JsonResponse({'message': 'Patient not found'}, status=404)

    # Check if a pending request already exists
    existing_request = AttendanceRequest.objects.filter(doctor=doctor, patient=patient, status='pending').first()
    if existing_request:
        return JsonResponse({'message': 'Request already sent'}, status=400)

    # Create a new attendance request
    attendance_request = AttendanceRequest.objects.create(doctor=doctor, patient=patient)
    return JsonResponse({'message': 'Request sent successfully', 'request_id': attendance_request.id})


@require_http_methods(["GET"])
def get_pending_requests(request):
    """Fetch all pending attendance requests for the current patient."""
    patient = get_object_or_404(PatientInfo, user=request.user)
    requests = AttendanceRequest.objects.filter(patient=patient, status='pending')
    
    requests_data = [
        {
            'id': req.id,
            'doctor_name': req.doctor.user.name,  # Use the name field from UserAccount
            'status': req.status
        }
        for req in requests
    ]

    return JsonResponse({'requests': requests_data})


@require_http_methods(["POST"])
def patient_respond_to_request(request, request_id):
    """Respond to an attendance request."""
    attendance_request = get_object_or_404(AttendanceRequest, id=request_id, patient__user=request.user)

    # Parse the JSON body
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)

    action = data.get('action')

    if action == 'accept':
        attendance_request.status = 'accepted'
        attendance_request.save()
        return JsonResponse({'message': 'Request accepted'})
    elif action == 'reject':
        attendance_request.status = 'rejected'
        attendance_request.save()
        return JsonResponse({'message': 'Request rejected'})
    else:
        return JsonResponse({'message': 'Invalid action'}, status=400)


@require_http_methods(["POST"])
def doctor_update_patient_stats(request, request_id):
    try:
        doctor = DoctorInfo.objects.filter(user=request.user).first()
        if not doctor:
            return JsonResponse({'message': 'Doctor not found'}, status=404)

        attendance_request = get_object_or_404(AttendanceRequest, id=request_id, doctor=doctor)

        if attendance_request.status != 'accepted':
            return JsonResponse({'message': 'Request not accepted by patient'}, status=403)

        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        blood_pressure = data.get('blood_pressure')
        heart_rate = data.get('heart_rate')
        other_notes = data.get('other_notes', '')  # Optional field
        
        # Explicit validation
        if not blood_pressure:
            return JsonResponse({'message': 'Blood pressure is required'}, status=400)
            
        try:
            # Convert heart_rate to integer and validate
            heart_rate = int(heart_rate)
            if heart_rate <= 0:
                return JsonResponse({'message': 'Heart rate must be a positive number'}, status=400)
        except (TypeError, ValueError):
            return JsonResponse({'message': 'Heart rate must be a valid number'}, status=400)

        # Create or update patient stats
        stats, created = PatientStats.objects.get_or_create(
            request=attendance_request,
            defaults={
                'blood_pressure': blood_pressure,
                'heart_rate': heart_rate,
                'other_notes': other_notes
            }
        )
        
        if not created:
            stats.blood_pressure = blood_pressure
            stats.heart_rate = heart_rate
            stats.other_notes = other_notes
            stats.save()

        return JsonResponse({'message': 'Patient stats updated successfully'})
        
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON data'}, status=400)
    except Exception as e:
        print(f"Error in doctor_update_patient_stats: {str(e)}")  # Log the error
        return JsonResponse({'message': f'Error updating stats: {str(e)}'}, status=500)



@require_http_methods(["GET"])
def get_request_status(request, request_id):
    attendance_request = get_object_or_404(AttendanceRequest, id=request_id, doctor__user=request.user)
    return JsonResponse({'status': attendance_request.status})



from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from .models import AttendanceRequest, DoctorInfo

@require_http_methods(["GET"])
def get_accepted_requests(request):
    """Fetch all accepted attendance requests for the current doctor."""
    # Fetch all DoctorInfo records for the current logged-in user
    doctor_list = DoctorInfo.objects.filter(user=request.user)
    
    if not doctor_list.exists():
        return JsonResponse({'message': 'No doctor information found for the user'}, status=404)

    # Fetch all attendance requests for the doctors associated with this user
    accepted_requests = AttendanceRequest.objects.filter(
        doctor__in=doctor_list, status='accepted'
    )

    # Prepare the response data
    requests_data = [
        {
            'id': req.id,
            'patient_name': req.patient.user.name,
            # 'patient_email': req.patient.user.email,  # Optionally include the patient's email
            'status': req.status,
            'request_time': req.request_time.strftime('%Y-%m-%d %H:%M'),  # Include request time
        }
        for req in accepted_requests
    ]

    return JsonResponse({'requests': requests_data})


from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import PatientStats, AttendanceRequest
from user_info.models import PatientInfo

@login_required
def get_patient_stats(request):
    try:
        # Get patient info for the logged-in user
        patient = PatientInfo.objects.get(user=request.user)
        
        # Get all attendance requests for this patient
        attendance_requests = AttendanceRequest.objects.filter(
            patient=patient
        ).select_related('doctor', 'doctor__user')
        
        stats_data = []
        for req in attendance_requests:
            try:
                stats = PatientStats.objects.get(request=req)
                stats_data.append({
                    'doctor_name': req.doctor.user.name,
                    'hospital': req.doctor.hospital,
                    'blood_pressure': stats.blood_pressure,
                    'heart_rate': stats.heart_rate,
                    'other_notes': stats.other_notes,
                    'date': req.request_time.strftime('%Y-%m-%d'),
                    'time': req.request_time.strftime('%H:%M'),
                })
            except PatientStats.DoesNotExist:
                continue
                
        return JsonResponse({'stats': stats_data})
    except PatientInfo.DoesNotExist:
        return JsonResponse({'error': 'Patient information not found'}, status=404)