from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BuilderSerializer, CarSerializer, ProjectSerializer
from .models import Builder, Car, Project


class BuilderView(viewsets.ModelViewSet):
    queryset =  Builder.objects.all()
    serializer_class = BuilderSerializer

class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer


class ProjectView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

