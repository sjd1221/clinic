from django.contrib import admin
from .models import Doctor, Details
from import_export.admin import ImportExportModelAdmin



class DoctorAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ["Name", "IdDoctor"]
    search_fields = ["Name", "IdDoctor"]

class DetailsAdmin(admin.ModelAdmin):
    list_display = ["Doctor", "DateDoctor"]
    search_fields = ["Doctor", "DateDoctor"]

admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Details, DetailsAdmin)





# Register your models here.
