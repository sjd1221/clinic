from django.db import models


class Doctor(models.Model):
    Name = models.CharField(max_length=200)
    IdDoctor = models.CharField(max_length=200)


class Delay(models.Model):
    IdDoctor = models.CharField(max_length=200)
    Date = models.DateField()
    DelayDoctor = models.TimeField()
    EnterDoctor = models.TimeField()
    HurryDoctor = models.TimeField()
    ExitDoctor = models.TimeField()



# Create your models here.
