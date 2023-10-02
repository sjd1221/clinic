from django.contrib import admin
from .models import Doctor, Details




class DoctorAdmin(admin.ModelAdmin):
    pass

class DetailsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Details, DetailsAdmin)





# Register your models here.
