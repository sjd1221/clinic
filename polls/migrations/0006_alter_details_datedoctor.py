# Generated by Django 4.2.4 on 2023-09-30 07:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_alter_details_datedoctor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='details',
            name='DateDoctor',
            field=models.DateField(auto_now=True, null=True),
        ),
    ]