FROM node:0.12.4

ENV CCS /opt/ccs

RUN apt-get update
RUN apt-get install -y openjdk-7-jre unzip sudo supervisor
RUN npm install -g ember-cli@0.2.3 ; npm install -g bower
RUN useradd -s /bin/bash -U -m -d /home/ccs ccs
RUN echo 'ccs:ccs_default_pw' | chpasswd
RUN mkdir -p ${CCS} /var/run/sshd

RUN wget -nv -O - http://www.networkz.ch/solr-5.1.0-ccs-customized.tar.gz | tar xzf - -C "/opt"
RUN apt-get install -y python-setuptools python-dev openssh-server
RUN easy_install -U ciscoconfparse lxml

COPY . ${CCS}
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN chown -R ccs:ccs ${CCS} /opt/solr-5.1.0
RUN rm /opt/solr-5.1.0/server/solr/configsearchcore
RUN ln -s /opt/ccs/configsearchcore /opt/solr-5.1.0/server/solr/configsearchcore
RUN ln -s /opt/solr-5.1.0 /opt/ccs/solr
RUN cd ${CCS}/ember/ccsui ; sudo -u ccs /usr/local/bin/npm install ; sudo -u ccs /usr/local/bin/bower install

EXPOSE 4200
EXPOSE 4222
EXPOSE 8983

CMD ["/usr/bin/supervisord"]
