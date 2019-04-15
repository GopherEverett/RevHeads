from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('builders', views.BuilderView)
router.register('cars', views.CarView)
router.register('projects', views.ProjectView)

urlpatterns = [
    path('', include(router.urls))
]