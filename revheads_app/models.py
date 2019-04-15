from django.db import models

class Builder(models.Model):
    name = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Car(models.Model):
    name = models.CharField(max_length=255)
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.CharField(max_length=10)
    photo_url = models.CharField(max_length=255)
    votes = models.IntegerField
    builder = models.ForeignKey(Builder, on_delete=models.CASCADE, related_name='cars')

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=255)
    date_begin = models.DateField
    date_end = models.DateField
    details = models.TextField(max_length=500)
    photo_url = models.CharField(max_length=255)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.title
# Create your models here.
