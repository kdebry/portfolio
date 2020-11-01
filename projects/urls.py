from django.urls import path

from projects import views


urlpatterns = [
    path("", views.home, name="home"),
    path("project/", views.project_index, name="project_index"),
    path("<int:pk>/", views.project_detail, name="project_detail"),
    path("contact/", views.contact, name="contact"),
]
