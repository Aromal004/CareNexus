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
    doctor = get_object_or_404(DoctorInfo, user=request.user)
    attendance_request = get_object_or_404(AttendanceRequest, id=request_id, doctor=doctor)

    if attendance_request.status != 'accepted':
        return JsonResponse({'message': 'Request not accepted by patient'}, status=403)

    # Get the patient stats from request
    blood_pressure = request.POST.get('blood_pressure')
    heart_rate = request.POST.get('heart_rate')
    other_notes = request.POST.get('other_notes')

    # Create or update patient stats
    stats, created = PatientStats.objects.get_or_create(request=attendance_request)
    stats.blood_pressure = blood_pressure
    stats.heart_rate = heart_rate
    stats.other_notes = other_notes
    stats.save()

    return JsonResponse({'message': 'Patient stats updated successfully'})



@require_http_methods(["GET"])
def get_request_status(request, request_id):
    attendance_request = get_object_or_404(AttendanceRequest, id=request_id, doctor__user=request.user)
    return JsonResponse({'status': attendance_request.status})
