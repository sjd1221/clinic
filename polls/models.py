from django.db import models


class Doctor(models.Model):
    Name = models.CharField(max_length=200)
    IdDoctor = models.CharField(max_length=200)

    def __str__(self):
        return self.Name



class Details(models.Model):
    DateDoctor = models.DateField(auto_now=True, null=True, blank=True)
    DelayDoctor = models.TimeField(null=True, blank=True)
    EnterDoctor = models.TimeField(null=True, blank=True)
    HurryDoctor = models.TimeField(null=True, blank=True)
    ExitDoctor = models.TimeField(null=True, blank=True)
    Doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)






# Create your models here.
