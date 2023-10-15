from django.urls import path
from . import views
from rest_framework.authtoken import views as tokenviews

urlpatterns = [
    path('', views.signup_view),
    path('api-token-auth/', tokenviews.obtain_auth_token)
    # edit credentials PATCH Token Based
    # path('<int:u_id>/', views.edit_user_view),
    # otpverifyrequest POST otpgenerate GET Token Based
    # path('otp/', views.otp_view)
]
