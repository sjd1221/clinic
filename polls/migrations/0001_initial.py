# Generated by Django 4.2.4 on 2023-10-10 08:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=200)),
                ('IdDoctor', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Details',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('DateDoctor', models.DateField(auto_now=True, null=True)),
                ('DelayDoctor', models.TimeField(blank=True, null=True)),
                ('EnterDoctor', models.TimeField(blank=True, null=True)),
                ('HurryDoctor', models.TimeField(blank=True, null=True)),
                ('ExitDoctor', models.TimeField(blank=True, null=True)),
                ('Doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.doctor')),
            ],
        ),
    ]
