from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Doctor, Delay
import datetime
from django.views.decorators.csrf import csrf_exempt, csrf_protect
import json
from django.contrib.auth import authenticate




@csrf_exempt
def loginpage(request):
    x = json.loads(request.body)
    user = authenticate(username=x['Username'], password=x['Password'])
    if user is not None:
        return JsonResponse({"ok", "yes"}, safe=False)
    
    # day_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    # date = Delay.objects.all()
    # day = datetime.datetime.strptime(str(date[0].Date), '%Y-%m-%d').weekday()
    # return HttpResponse(day_name[day])
# Create your views here.
