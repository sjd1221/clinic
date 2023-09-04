from django.contrib import admin
from .models import Delay, Doctor


class DelayAdmin(admin.ModelAdmin):
    pass

class DoctorAdmin(admin.ModelAdmin):
    pass


admin.site.register(Delay, DelayAdmin)
admin.site.register(Doctor, DoctorAdmin)




# Register your models here.
