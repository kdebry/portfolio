# Use the official Python image from the Docker Hub
FROM python:3.8.5

# These two environment variables prevent __pycache__/ files.
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update && apt-get install -y netcat

# Create an app user 
RUN useradd --user-group --create-home --no-log-init --shell /bin/bash app

ENV APP_HOME=/home/app/web

# Create the staticfiles directory. This avoids permission errors. 
RUN mkdir -p $APP_HOME/static

# Change the working directory. 
# Every command after this will be run from the /code directory.
WORKDIR APP_HOME

# Copy the requirements.txt file.
COPY ./requirements.txt $APP_HOME

# Upgrade pip
RUN pip install --upgrade pip

# Install the requirements.
RUN pip install -r requirements.txt

# Copy the rest of the code. 
COPY . $APP_HOME 

RUN chown -R app:app $APP_HOME 

USER app:app

ENTRYPOINT ["/home/app/web/entrypoint.sh"]
