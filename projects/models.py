from django.db import models

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    technology = models.CharField(max_length=100)
    link = models.URLField(max_length=200)
    image = models.FilePathField(path="/img")
