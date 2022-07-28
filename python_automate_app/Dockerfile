FROM python:3


WORKDIR /app/python_app
CMD chmod o+x /app/python_app


RUN apt-get update && apt-get -y install cron

# Copy cron file to the cron.d directory
COPY schedule-cron /etc/cron.d/schedule-cron

# Give execution rights on the cron job
# RUN chmod 0644 /etc/cron.d/schedule-cron
# give all permmision (for now change to 0644 later)
RUN chmod 0777 /etc/cron.d/schedule-cron

COPY . .

RUN python3 -m pip install --upgrade pip && \
    python3 -m pip install -r requirements.txt
RUN pip install pymongo

RUN chmod -R ugo+rX /usr/local/lib/python3.10/site-packages/

RUN chmod 0777 entrypoint.sh
RUN chmod 0777 process_supplier_data.py

# Apply cron job
RUN crontab /etc/cron.d/schedule-cron


# Create the log file to be able to run tail

RUN touch /var/log/cron.log

# Run the command on container startup
CMD ["cron", "-f"]
