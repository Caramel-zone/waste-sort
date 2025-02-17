from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('process_image/', views.process_image, name='process_image'),
    path('process_video/', views.process_video, name='process_video'),
    path('results/', views.results, name='results'),  
]
