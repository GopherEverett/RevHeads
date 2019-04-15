from rest_framework import serializers

from .models import Builder, Car, Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'date_begin', 'date_end', 'details', 'photo_url', 'car')

class CarSerializer(serializers.ModelSerializer):
    projects = ProjectSerializer(many=True, read_only=True)
    class Meta:
        model = Car
        fields = ('id', 'name', 'make', 'model', 'year', 'photo_url', 'votes', 'builder', 'projects')

class BuilderSerializer(serializers.ModelSerializer):
    cars = CarSerializer(many=True, read_only=True)
    class Meta:
        model = Builder
        fields = ('id', 'name', 'photo_url', 'location', 'cars')