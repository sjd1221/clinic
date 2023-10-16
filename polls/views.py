from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Doctor, Details
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from django.contrib.auth import authenticate
from django.core import serializers
from itertools import chain
from datetime import date
import pandas as pd




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
    # doctors = serializers.serialize("json", Doctor.objects.all())
    # doct = json.loads(doctors)
    # return JsonResponse(doct, safe=False)
    doct = list(Doctor.objects.all().values())
    detail = list(Details.objects.all().values())
    return JsonResponse({"doct": doct,
                         "detail": detail}, safe=False)


@csrf_exempt
def adddoctor(request):
    x = json.loads(request.body)
    # serdoct = Doctor.objects.filter(IdDoctor = x["id"])
    if x["DateDoctor"] == "":
        x["DateDoctor"] = date.today()
    if bool(Details.objects.filter(Doctor = Doctor.objects.get(IdDoctor=x["id"]), DateDoctor= x["DateDoctor"])) is False:
        newdelay = Details.objects.create(Doctor = Doctor.objects.get(IdDoctor=x["id"]), DateDoctor= x["DateDoctor"], DelayDoctor= x["DelayDoctor"],EnterDoctor= x["EnterDoctor"], HurryDoctor= x["HurryDoctor"], ExitDoctor= x["ExitDoctor"])
    else:
        Details.objects.filter(Doctor = Doctor.objects.get(IdDoctor=x["id"]), DateDoctor= x["DateDoctor"]).update(DelayDoctor= x["DelayDoctor"],EnterDoctor= x["EnterDoctor"], HurryDoctor= x["HurryDoctor"], ExitDoctor= x["ExitDoctor"])
        newdelay = Details.objects.filter(Doctor = Doctor.objects.get(IdDoctor=x["id"]), DateDoctor= x["DateDoctor"])
    # serdoct = serializers.serialize("json", newdelay)
    # serdoct = json.loads(serdoct)
    detail = serializers.serialize("json", Details.objects.all())
    detail = json.loads(detail)
    return JsonResponse(detail, safe= False)
    # return HttpResponse(Details.objects.filter(Doctor = Doctor.objects.get(IdDoctor=x["id"]), DateDoctor= x["DateDoctor"]))






@csrf_exempt
def adddelay(request):
    x = json.loads(request.body)
    doct = Doctor.objects.filter(IdDoctor=x["id"])
    deldoctor = Details.objects.filter(Doctor =doct[0]).update(DelayDoctor= x["DelayDoctor"],EnterDoctor= x["EnterDoctor"], HurryDoctor= x["HurryDoctor"], ExitDoctor= x["ExitDoctor"])
    return HttpResponse("hello")







def testsite(request):
    detail = serializers.serialize("json", Details.objects.select_related('Doctor'))
    detail = json.loads(detail)
    x = Details.objects.select_related('Doctor')
    return JsonResponse(detail, safe=False)
    # return HttpResponse(x)
    # if bool(Details.objects.filter(Doctor=Doctor.objects.get(IdDoctor=1378),DateDoctor="2023-10-10") is None) is False:
    #     return HttpResponse("x")
    # else:
    #     return HttpResponse("hi")
    # doct = list(Doctor.objects.all().values())
    # detail = list(Details.objects.all().values())
    # return JsonResponse({"doct": doct,
    #                      "detail": detail}, safe=False)


def checksite(request):
    detail = Details.objects.all()
    return HttpResponse(detail[0].Doctor)