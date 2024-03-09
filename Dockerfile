FROM httpd:2.4
COPY ./ /usr/local/apache2/htdocs/
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./my-httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf
COPY ./certs /usr/local/apache2/conf/