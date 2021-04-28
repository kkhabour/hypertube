FROM node


RUN apt-get update
RUN apt-get upgrade -y

RUN npm install -g npm@7.8.0


# Install tools & libraries
RUN apt-get -y install apt-utils wget dialog build-essential git curl libcurl3 libcurl3-dev zip ssmtp libpng-dev

RUN apt-get install -y libvpx-dev
RUN apt-get install -y libvorbis-dev


RUN apt-get install -y ffmpeg

RUN echo 'TLS_CA_FILE=/etc/pki/tls/certs/ca-bundle.crt' >> /etc/ssmtp/ssmtp.conf
RUN echo 'root=hypertubematcha@gmail.com' >> /etc/ssmtp/ssmtp.conf
RUN echo 'mailhub=smtp.gmail.com:587' >> /etc/ssmtp/ssmtp.conf
RUN echo 'AuthUser=hypertubematcha@gmail.com' >> /etc/ssmtp/ssmtp.conf
RUN echo 'AuthPass=Test1337@' >> /etc/ssmtp/ssmtp.conf
RUN echo 'UseSTARTTLS=Yes' >> /etc/ssmtp/ssmtp.conf
RUN echo 'UseTLS=Yes' >> /etc/ssmtp/ssmtp.conf
RUN echo 'hostname=AAAA' >> /etc/ssmtp/ssmtp.conf

RUN echo 'root:hypertubematcha@gmail.com:smtp.gmail.com:587' >> /etc/ssmtp/revaliases


WORKDIR /code/app
COPY app/. .

RUN npm install

RUN chown -R www-data:www-data .

# CMD ["tail", "-f", "/dev/null"]

CMD [ "npm", "start" ]

