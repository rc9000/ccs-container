FROM node:0.12.4

ENV CCS /opt/ccs

RUN apt-get update
RUN apt-get install -y openjdk-7-jre unzip sudo
RUN useradd -s /bin/bash -U -m -d /home/ccs ccs
RUN mkdir -p ${CCS}

RUN wget -O - http://www.networkz.ch/solr-5.1.0-ccs-customized.tar.gz | tar xzf - -C "/opt"

ADD . ${CCS}

RUN chown -R ccs:ccs ${CCS} /opt/solr-5.1.0
RUN rm /opt/solr-5.1.0/server/solr/configsearchcore
RUN ln -s /opt/ccs/configsearchcore /opt/solr-5.1.0/server/solr/configsearchcore

EXPOSE 4200
EXPOSE 8983

ENTRYPOINT ["sudo", "-u", "ccs", "/opt/solr-5.1.0/bin/solr"]
