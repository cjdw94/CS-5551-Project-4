FROM ubuntu:16.04

RUN apt-get update \
	&& DEBIAN_FRONTEND=noninteractive apt-get install -y locales \
    && apt-get install -yq --no-install-recommends \
    python3 \
    python3-pip
	
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8
	
RUN pip3 install --upgrade pip==9.0.3 \
    && pip3 install setuptools
	
ENV LANG en_US.UTF-8 

# for flask web server
EXPOSE 8081

# set working directory
ADD . /app
WORKDIR /app

# install required libraries
RUN pip3 install -r requirements.txt

# This is the runtime command for the container
RUN chmod +x app.py
CMD python3 app.py