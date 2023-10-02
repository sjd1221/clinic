from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Doctor, Details
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from django.contrib.auth import authenticate
from django.core import serializers
from itertools import chain
from datetime import date




@csrf_exempt
def loginpage(request):
    x = json.loads(request.body)
    user = authenticate(username=x['Username'], password=x['Password'])
    if user is not None:
        return JsonResponse({"stat": "yes"})
    else:
        return JsonResponse({"stat": "no"})

    # day_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    # date = Delay.objects.all()
    # day = datetime.datetime.strptime(str(date[0].Date), '%Y-%m-%d').weekday()
    # return HttpResponse(day_name[day])
# Create your views here.

def showdoctor(request):
    doctors = serializers.serialize("json", Doctor.objects.all())
    doct = json.loads(doctors)
    return JsonResponse(doct, safe=False)


@csrf_exempt
def adddelay(request):
    x = json.loads(request.body)
    doct = Doctor.objects.filter(IdDoctor = x)
    if bool(Details.objects.filter(Doctor = doct[0], DateDoctor= date.today())) is False:
        newdelay = Details.objects.create(Doctor = doct[0])
    else:
        pass

    return HttpResponse(doct)



def testsite(request):
    x = Details.objects.all()
    doct = Doctor.objects.filter(IdDoctor=1234567)
    y = Details.objects.filter(Doctor=doct[0], DateDoctor="2023-09-30")

    if bool(y) is False:
        return HttpResponse("12344")
    else:
        return HttpResponse("111111")