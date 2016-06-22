"""
Definition of models.
"""

from django.db import models

class Startup(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    desc = models.TextField(max_length=1024, null=True)
    twitter = models.CharField(max_length=200, null=True)
    logo = models.CharField(max_length=200, null=True )
    link = models.CharField(max_length=200, null=True)

    def __str__(self):              
        return self.name

class Founder(models.Model):
    startup = models.ForeignKey(Startup)
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, null=True)
    linkedin = models.CharField(max_length=200, null=True)
    headshot = models.CharField(max_length=200, null=True)
    twitter = models.CharField(max_length=200, null=True)

    def __str__(self):              
        return self.name