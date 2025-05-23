FROM bitnami/wildfly:latest

COPY build/libs/WebLab3.war /opt/bitnami/wildfly/standalone/deployments/ROOT.war
COPY postgres-ds.xml /opt/bitnami/wildfly/standalone/deployments/
COPY driver/postgresql-42.7.4.jar /opt/bitnami/wildfly/modules/org/postgresql/main/
COPY driver/module.xml /opt/bitnami/wildfly/modules/org/postgresql/main/

EXPOSE 8080 9990

RUN /opt/bitnami/wildfly/bin/add-user.sh admin admin --silent

CMD ["/opt/bitnami/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]