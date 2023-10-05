from django.contrib import admin
from .models import Doctor, Details
from import_export.admin import ImportExportModelAdmin



class DoctorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    pass

class DetailsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Details, DetailsAdmin)





# Register your models here.
