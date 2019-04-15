from django.contrib import admin
from .models import  Builder, Car, Project

admin.site.register([Builder, Car, Project])
# Register your models here.
