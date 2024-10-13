# views.py
from django.contrib.auth import authenticate, login,logout
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt  # Allows CSRF exemption for the POST request
from django.views.decorators.http import require_POST  # Ensures the view only accepts POST requests
import json
from .models import UserAccount

@csrf_exempt  # You may want to handle CSRF tokens properly in production
@require_POST  # Only allow POST requests
def custom_session_login_view(request):
    # Parse the JSON body from the request
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Log the user in using Django's session-based authentication
            login(request, user)
            return JsonResponse({'status': 'success', 'message': 'User logged in successfully!'}, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password.'}, status=401)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

def custom_session_logout_view(request):
    logout(request)
    # Redirect to the login page (or any page you prefer)
    return render(request, 'index.html')   # Replace 'login' with the actual path to your login page
