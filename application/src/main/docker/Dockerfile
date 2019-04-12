FROM ubuntu:16.04


## Add the init script to the image
ADD init.sh init.sh
RUN chmod +x /init.sh

## Add the wait script to the image
ADD wait.sh wait.sh
RUN chmod +x /wait.sh

# Java
RUN apt-get update && \
    apt-get install -y  software-properties-common && \
    add-apt-repository ppa:openjdk-r/ppa
RUN apt-get update && apt-get install -y openjdk-8-jdk
# Define commonly used JAVA_HOME variable
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64

RUN apt-get install -y netcat-openbsd

ADD full-teaching-1.5.0.war app.jar

RUN bash -c 'touch /app.jar'

EXPOSE 5000

CMD /wait.sh && /init.sh
