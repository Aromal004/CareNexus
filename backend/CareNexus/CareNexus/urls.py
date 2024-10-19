
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from login_register.views import custom_session_login_view,custom_session_logout_view
from user_info.views import display_user_info

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('user_info/', include('user_info.urls')),
    path('login/', custom_session_login_view, name='login'),   
    path('logout/', custom_session_logout_view, name='logout'),
    path('dashboard/',display_user_info, name='dashboard')  
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# This should be the last pattern in urlpatterns
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
